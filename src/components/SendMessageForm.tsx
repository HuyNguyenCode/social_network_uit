import { useState } from "react";

interface SendMessageFormProps {
  sendMessage: (msg: string) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [msg, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(msg);
        setMessage("");
      }}
    >
      <input
        type="text"
        onChange={(e) => setMessage((e.target as HTMLInputElement).value)}
        value={msg}
        aria-placeholder="type a message"
      />
      <button type="submit" disabled={!msg}>
        Send
      </button>
    </form>
  );
};
export default SendMessageForm;
