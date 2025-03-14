import CkEditor from "./ckEditor";
import { Dispatch, SetStateAction } from "react";

interface TextEditorProps {
  editorData: string;
  setEditorData: Dispatch<SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ editorData, setEditorData }) => {
  return (
    <CkEditor
      editorData={editorData}
      setEditorData={setEditorData}
    />
  );
};

export default TextEditor;