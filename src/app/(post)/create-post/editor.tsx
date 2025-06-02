import CkEditor from "./ckEditor";
import { useState } from "react";
interface TextEditorProps {
  editorData: string;
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ editorData, setEditorData }) => {
  // const [editorData, setEditorData] = useState<string>("");

  return <CkEditor editorData={editorData} setEditorData={setEditorData} />;
};

export default TextEditor;
