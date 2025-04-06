import CkEditor from "./ckEditor";
import { useState } from "react";
const TextEditor: React.FC = () => {
  const [editorData, setEditorData] = useState<string>("");

  return (
    <CkEditor
      editorData={editorData}
      setEditorData={setEditorData}
    />
  );
};

export default TextEditor;