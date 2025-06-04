/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { useUserStore } from "@/store/useUserStore";

const ChatPage = () => {
  const { userId, username } = useUserStore();
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [conn, setConnection] = useState<HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const [messages, setMessages] = useState<
    { id: string; username: string; avatar: string; msg: string; sentAt: string; readStatus: boolean }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(() => {
    return localStorage.getItem("selectedUser") || null;
  });
  const [messageInput, setMessageInput] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<{ id: string; userName: string; avatarId: string }[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    if (userId && username) {
      setCurrentUser({ id: userId, name: username });
    }
  }, [userId, username]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", selectedUser);
    } else {
      localStorage.removeItem("selectedUser");
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!currentUser) return;

    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:44371/chathub?userId=${currentUser.id}`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();

    connectionRef.current = connection;
    setConnection(connection);

    connection.onreconnecting((error) => {
      setConnectionStatus("Reconnecting...");
      console.warn("Connection lost, reconnecting...", error);
    });

    connection.onreconnected((connectionId) => {
      setConnectionStatus("Connected");
      console.log("Reconnected with ID:", connectionId);
    });

    connection.onclose((error) => {
      setConnectionStatus("Disconnected");
      console.error("Connection closed:", error);
    });

    // Map danh sách người dùng online
    connection.on("UpdateActiveUsers", (userDetails: { id: string; userName: string; avatarId: string }[]) => {
      console.log("UpdateActiveUsers Response:", userDetails);
      const formattedUsers = userDetails
        .filter((user) => user.id !== currentUser.id) // Loại bỏ người dùng hiện tại
        .map((user) => ({
          id: user.id,
          userName: user.userName,
          avatarId: user.avatarId || "", // Đảm bảo avatarId không undefined
        }));
      setOnlineUsers(formattedUsers);
    });

    // Map tin nhắn mới
    connection.on(
      "ReceiveMessage",
      (sender: string, msg: string, messageId: string, senderName: string, senderAvatar: string, sentAt: string) => {
        console.log("ReceiveMessage Response:", { sender, msg, messageId, senderName, senderAvatar, sentAt });
        const newMessage = {
          id: messageId,
          username: sender === currentUser.id ? currentUser.name : senderName,
          avatar: sender === currentUser.id ? "" : senderAvatar || "",
          msg,
          sentAt: sentAt || new Date().toISOString(), // Sử dụng SentAt từ server, fallback về thời gian hiện tại
          readStatus: sender === currentUser.id,
        };
        setMessages((prev) => [...prev, newMessage]);
      },
    );

    // Map danh sách tin nhắn khi vào đoạn chat
    connection.on("LoadMessages", (loadedMessages: any[]) => {
      console.log("LoadMessages Response:", loadedMessages);
      const formattedMessages = loadedMessages.map((m) => ({
        id: m.id,
        username: m.senderId === currentUser.id ? currentUser.name : m.senderName || "Unknown",
        avatar: m.senderId === currentUser.id ? "" : m.senderAvatar || "",
        msg: m.content,
        sentAt: m.sentAt,
        readStatus: m.readStatus,
      }));
      setMessages(formattedMessages);
    });

    const startConnection = async () => {
      try {
        await connection.start();
        setConnectionStatus("Connected");
        console.log("SignalR Connected");

        if (selectedUser) {
          await joinChat(currentUser.id, selectedUser);
        }
      } catch (error) {
        setConnectionStatus("Disconnected");
        console.error("SignalR Connection Failed:", error);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().then(() => {
          console.log("SignalR Disconnected");
          connectionRef.current = null;
        });
      }
    };
  }, [currentUser]);

  const checkIfBlocked = async (receiverId: string) => {
    if (conn && conn.state === HubConnectionState.Connected && currentUser) {
      try {
        const isBlocked = await conn.invoke("IsUserBlocked", currentUser.id, receiverId);
        console.log("IsUserBlocked Response:", { receiverId, isBlocked });
        return isBlocked;
      } catch (err) {
        console.error("Lỗi khi kiểm tra trạng thái chặn:", err);
        return false;
      }
    }
    return false;
  };

  const joinChat = async (senderId: string, receiverId: string) => {
    if (conn && conn.state === HubConnectionState.Connected) {
      try {
        const isBlocked = await checkIfBlocked(receiverId);
        if (isBlocked) {
          alert("Bạn đã chặn hoặc bị chặn bởi người dùng này.");
          setSelectedUser(null);
          setMessages([]);
          return;
        }
        const roomId = [senderId, receiverId].sort().join("-");
        await conn.invoke("JoinRoom", roomId, senderId, receiverId);
      } catch (error) {
        console.error("Lỗi khi tham gia trò chuyện:", error);
        setSelectedUser(null);
        setMessages([]);
      }
    } else {
      setSelectedUser(null);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (conn && conn.state === HubConnectionState.Connected && selectedUser && messageInput.trim() !== "") {
      const senderId = currentUser?.id;
      if (!senderId) {
        alert("Vui lòng đăng nhập để gửi tin nhắn.");
        return;
      }
      const receiverId = selectedUser;
      const isBlocked = await checkIfBlocked(receiverId);
      if (isBlocked) {
        alert("Bạn đã chặn hoặc bị chặn bởi người dùng này.");
        return;
      }
      const roomId = [senderId, receiverId].sort().join("-");

      try {
        await conn.invoke("SendMessage", roomId, senderId, receiverId, messageInput);
        setMessageInput("");
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }
    } else {
    }
  };

  const handleSelectUser = async (userId: string) => {
    setMessages([]); // Xóa tin nhắn cũ trước khi vào đoạn chat mới
    setSelectedUser(userId);
    if (currentUser) {
      await joinChat(currentUser.id, userId);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    if (conn && conn.state === HubConnectionState.Connected && currentUser) {
      try {
        await conn.invoke("UpdateMessageStatus", messageId, true);
        console.log("UpdateMessageStatus Invoked:", { messageId, status: true });
        setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, readStatus: true } : msg)));
      } catch (err) {
        console.error("Lỗi khi cập nhật trạng thái tin nhắn:", err);
      }
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (conn && conn.state === HubConnectionState.Connected && currentUser) {
      try {
        await conn.invoke("DeleteMessage", messageId, currentUser.id);
        console.log("DeleteMessage Invoked:", { messageId, userId: currentUser.id });
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      } catch (err) {
        console.error("Lỗi khi xóa tin nhắn:", err);
      }
    }
  };

  const archiveConversation = async () => {
    if (conn && conn.state === HubConnectionState.Connected && currentUser && selectedUser) {
      try {
        await conn.invoke("ArchiveConversation", currentUser.id, selectedUser, true);
        console.log("ArchiveConversation Invoked:", { senderId: currentUser.id, receiverId: selectedUser });
        setSelectedUser(null);
        setMessages([]);
      } catch (err) {
        console.error("Lỗi khi lưu trữ hội thoại:", err);
        alert("Không thể lưu trữ hội thoại.");
      }
    }
  };

  const searchMessages = async () => {
    if (conn && conn.state === HubConnectionState.Connected && currentUser && selectedUser && searchKeyword.trim() !== "") {
      try {
        await conn.invoke("SearchMessages", currentUser.id, selectedUser, searchKeyword);
        console.log("SearchMessages Invoked:", { senderId: currentUser.id, receiverId: selectedUser, searchKeyword });
      } catch (err) {
        console.error("Lỗi khi tìm kiếm tin nhắn:", err);
      }
    }
  };

  const blockUser = async () => {
    if (conn && conn.state === HubConnectionState.Connected && currentUser && selectedUser) {
      try {
        await conn.invoke("BlockUser", currentUser.id, selectedUser);
        console.log("BlockUser Invoked:", { userId: currentUser.id, blockedUserId: selectedUser });
        setBlockedUsers((prev) => [...prev, selectedUser]);
        setSelectedUser(null);
        setMessages([]);
        alert("Người dùng đã bị chặn.");
      } catch (err) {
        console.error("Lỗi khi chặn người dùng:", err);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ứng dụng Chat</h2>
      <p>
        Đăng nhập với tên: <strong>{username}</strong> | Trạng thái kết nối: <strong>{connectionStatus}</strong>
      </p>
      {!selectedUser ? (
        <div>
          <h3>Người dùng đang online</h3>
          {onlineUsers.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {onlineUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelectUser(user.id)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    color: "green",
                  }}
                >
                  {user.avatarId && (
                    <img
                      src={user.avatarId}
                      alt={user.userName}
                      style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                    />
                  )}
                  <div>
                    <strong>{user.userName}</strong> (Online)
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có người dùng nào đang online.</p>
          )}
        </div>
      ) : (
        <div>
          <h3>
            Trò chuyện với <strong>{onlineUsers.find((u) => u.id === selectedUser)?.userName || "Unknown"}</strong>
          </h3>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm tin nhắn"
              style={{ marginRight: "10px" }}
            />
            <button onClick={searchMessages}>Tìm</button>
            <button onClick={archiveConversation} style={{ marginLeft: "10px" }}>
              Lưu trữ hội thoại
            </button>
            <button onClick={blockUser} style={{ marginLeft: "10px" }}>
              Chặn người dùng
            </button>
          </div>
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  padding: "5px",
                  marginBottom: "10px",
                  background: message.readStatus ? "blue" : "green",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {message.avatar && (
                  <img
                    src={message.avatar}
                    alt={message.username}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                  />
                )}
                <div>
                  <strong>{message.username}: </strong>
                  {message.msg}
                  <br />
                  <small>
                    {new Date(message.sentAt).toLocaleString()} {message.readStatus ? "(Đã đọc)" : "(Chưa đọc)"}
                  </small>
                  {!message.readStatus && message.username !== currentUser?.name && (
                    <button onClick={() => markMessageAsRead(message.id)} style={{ marginLeft: "10px", fontSize: "12px" }}>
                      Đánh dấu đã đọc
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(message.id)}
                    style={{ marginLeft: "10px", fontSize: "12px", color: "red" }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Nhập tin nhắn"
              style={{ width: "80%", marginRight: "10px" }}
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
