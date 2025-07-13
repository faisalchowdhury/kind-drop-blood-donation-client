import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
const RichTextEditor = ({ placeholder, setContent, content }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
      height: 300,
    }),
    [placeholder]
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default RichTextEditor;
