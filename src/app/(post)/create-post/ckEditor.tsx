"use client";

import React, {FC, useEffect} from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  Base64UploadAdapter,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  Font,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  SourceEditing,
  Strikethrough,
  Superscript,
  Subscript,
  Code,
  CodeBlock,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

interface CkEditorProps {
  editorData: string;
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
}

const CkEditor: FC<CkEditorProps> = ({
  setEditorData,
  editorData,
}) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      config={{
        licenseKey: "GPL",
        plugins: [
          Autoformat,
          BlockQuote,
          Bold,
          Italic,
          Strikethrough,
          Superscript,
          Subscript,
          CloudServices,
          Essentials,
          Heading,
          Image,
          ImageCaption,
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Base64UploadAdapter,
          Indent,
          IndentBlock,
          Link,
          Font,
          List,
          Code,
          CodeBlock,
          Mention,
          Paragraph,
          PasteFromOffice,
          PictureEditing,
          Table,
          TableColumnResize,
          TableToolbar,
          TextTransformation,
          Underline,
          SourceEditing,
        ],
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "superscript",
          "subscript",
          "|",
          "link",
          "uploadImage",
          "insertTable",
          "blockQuote",
          "code",
          "|",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
          "sourceEditing",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            }
          ],
        },
        image: {
          resizeOptions: [
            {
              name: "resizeImage:original",
              label: "Default image width",
              value: null,
            },
            {
              name: "resizeImage:50",
              label: "50% page width",
              value: "50",
            },
            {
              name: "resizeImage:75",
              label: "75% page width",
              value: "75",
            },
          ],
          toolbar: [
            "imageTextAlternative",
            "toggleImageCaption",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        fontColor: {
          colors: [
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
            {
              color: "hsl(0, 75%, 60%)",
              label: "Red",
            },
            {
              color: "hsl(30, 75%, 60%)",
              label: "Orange",
            },
            {
              color: "hsl(60, 75%, 60%)",
              label: "Yellow",
            },
            {
              color: "hsl(90, 75%, 60%)",
              label: "Light green",
            },
            {
              color: "hsl(120, 75%, 60%)",
              label: "Green",
            },
          ],
        },
        fontBackgroundColor: {
          colors: [
            {
              color: "hsl(0, 75%, 60%)",
              label: "Red",
            },
            {
              color: "hsl(30, 75%, 60%)",
              label: "Orange",
            },
            {
              color: "hsl(60, 75%, 60%)",
              label: "Yellow",
            },
            {
              color: "hsl(90, 75%, 60%)",
              label: "Light green",
            },
            {
              color: "hsl(120, 75%, 60%)",
              label: "Green",
            },
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
          ],
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        initialData: editorData,
      }}
      onChange={(_event, editor) => {
        const data = editor.getData();
        setEditorData(data);
      }}
    />
  );
};

export default CkEditor;