import { useState, useEffect } from "react";
import socket from "@/lib/socket";

interface Message {
  id: string;
  chatId: string;
  content: string;
  sender: string;
  timestamp: Date;
}

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch(`/api/chat/${chatId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));

    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [chatId]);

  const sendMessage = (content: string) => {
    const message = { id: crypto.randomUUID(), chatId, content, sender: "user123", timestamp: new Date() };
    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]); 
  };

  return { messages, sendMessage };
};

export default useChat;
