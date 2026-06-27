"use client";

import { useState, useRef, useMemo } from "react";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function QuillEditor({ name, defaultValue }: { name: string, defaultValue?: string }) {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultValue || "");

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    height: 400,
    enableDragAndDropFileToEditor: true,
    buttons: [
      'source', '|',
      'bold', 'strikethrough', 'underline', 'italic', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'video', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize', 'print', 'about'
    ],
    // Clean HTML but don't aggressively strip classes like Quill does
    cleanHTML: {
      fillEmptyParagraph: false,
      removeEmptyElements: false,
    },
    uploader: {
      url: '/api/upload',
      format: 'json',
      method: 'POST',
      isSuccess: function (resp) {
        return !resp.error;
      },
      process: function (resp) {
        return {
          files: [resp.url],
          path: resp.url,
          baseurl: '',
          error: resp.error ? 1 : 0,
          msg: resp.error || ''
        };
      },
      defaultHandlerSuccess: function (data) {
        if (data.files && data.files.length) {
          this.s.insertImage(data.files[0]);
        }
      }
    }
  }), []);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <input type="hidden" name={name} value={content} />
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}} // just to suppress the warning
      />
    </div>
  );
}
