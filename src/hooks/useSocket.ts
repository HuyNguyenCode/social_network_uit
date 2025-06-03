import { useEffect } from "react";
import socket from "@/lib/socket";

const useSocket = (onMessage: (message: any) => void) => {
  useEffect(() => {
    socket.connect();
    socket.on("message", onMessage);
    
    return () => {
      socket.off("message", onMessage);
      socket.disconnect();
    };
  }, [onMessage]);
};

export default useSocket;
