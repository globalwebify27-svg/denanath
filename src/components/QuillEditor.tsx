"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// Helper: Convert a YouTube/Vimeo share URL to an embeddable URL
function toEmbedUrl(url: string): string | null {
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return null;
}

function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function getYoutubeThumbnail(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
  return null;
}

export default function QuillEditor({ name, defaultValue }: { name: string, defaultValue?: string }) {
  const editorRef = useRef<any>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(defaultValue || "");

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    height: 400,
    enableDragAndDropFileToEditor: true,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    buttons: [
      'source', '|',
      'bold', 'strikethrough', 'underline', 'italic', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'addVideo', 'uploadVideo', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize', 'print', 'about'
    ],
    disablePlugins: 'iframe,video',
    cleanHTML: {
      fillEmptyParagraph: false,
      removeEmptyElements: false,
    },
    uploader: {
      url: '/api/upload',
      format: 'json',
      method: 'POST',
      isSuccess: function (resp: any) {
        return !resp.error;
      },
      process: function (resp: any) {
        return {
          files: [resp.url],
          path: resp.url,
          baseurl: '',
          error: resp.error ? 1 : 0,
          msg: resp.error || ''
        };
      },
      defaultHandlerSuccess: function (this: any, data: any) {
        if (data.files && data.files.length) {
          const url = data.files[0];
          if (url.match(/\.(mp4|webm|ogg)$/i)) {
             this.s.insertHTML(`<div class="video-embed" data-video-url="${url}" data-video-type="mp4" contenteditable="false" style="background:#e0f2f1;border:2px solid #007a87;border-radius:12px;padding:20px;margin:10px 0;text-align:center;cursor:default;position:relative;">
              <button onclick="this.parentElement.remove()" style="position:absolute;top:10px;right:10px;background:#ef4444;color:white;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-weight:bold;z-index:10;display:flex;align-items:center;justify-center:center;" title="Delete Video">X</button>
              <strong style="color:#007a87;">🎬 Video: ${url}</strong>
             </div><p><br></p>`);
          } else {
             this.s.insertImage(url);
          }
        }
      }
    },
    extraButtons: [
      {
        name: 'addVideo',
        icon: 'video',
        tooltip: 'Add Video (YouTube / Vimeo / MP4 link)',
        exec: function (editorInstance: any) {
          const url = prompt('Paste a video link:\n\n• YouTube (e.g. https://youtu.be/7Ak9yBbeAwI)\n• Vimeo (e.g. https://vimeo.com/123456)\n• MP4 (e.g. https://example.com/video.mp4)');
          if (!url || !url.trim()) return;

          const trimmed = url.trim();
          let videoType = 'unknown';
          let displayUrl = trimmed;

          if (isDirectVideoUrl(trimmed)) {
            videoType = 'mp4';
          } else if (toEmbedUrl(trimmed)) {
            videoType = 'embed';
            displayUrl = toEmbedUrl(trimmed) || trimmed;
          } else {
            alert('Could not recognize this video link.\nPlease use a YouTube, Vimeo, or direct MP4 URL.');
            return;
          }

          // Get thumbnail for YouTube
          const thumb = getYoutubeThumbnail(trimmed);
          const thumbStyle = thumb ? `background-image:url(${thumb});background-size:cover;background-position:center;min-height:180px;` : '';
          const labelColor = thumb ? 'color:white;text-shadow:0 1px 4px rgba(0,0,0,0.8);' : 'color:#007a87;';

          // Insert a DIV placeholder that Jodit will NOT strip
          editorInstance.s.insertHTML(
            `<div class="video-embed" data-video-url="${displayUrl}" data-video-type="${videoType}" contenteditable="false" style="background:#e0f2f1;border:2px solid #007a87;border-radius:12px;padding:20px;margin:10px 0;text-align:center;cursor:default;position:relative;${thumbStyle}">
              <button onclick="this.parentElement.remove()" style="position:absolute;top:10px;right:10px;background:#ef4444;color:white;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-weight:bold;z-index:10;display:flex;align-items:center;justify-center:center;" title="Delete Video">X</button>
              <strong style="${labelColor}font-size:16px;">🎬 Video: ${trimmed}</strong>
            </div><p><br></p>`
          );

          // Force sync hidden input
          setTimeout(() => {
            const html = editorInstance.value;
            const inp = editorInstance.container?.closest('form')?.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;
            if (inp) inp.value = html;
          }, 200);
        }
      },
      {
        name: 'uploadVideo',
        icon: 'upload',
        tooltip: 'Upload Video File (MP4)',
        exec: function (editorInstance: any) {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'video/mp4,video/webm,video/ogg');
          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            const id = 'video-loading-' + Date.now();
            editorInstance.s.insertHTML(`<p id="${id}" style="color:#007a87;font-weight:bold;background:#e0f2f1;padding:10px;border-radius:8px;">Uploading video ${file.name}...</p>`);
            try {
              const res = await fetch('/api/upload', { method: 'POST', body: formData });
              const data = await res.json();
              if (data.url) {
                const html = `<div class="video-embed" data-video-url="${data.url}" data-video-type="mp4" contenteditable="false" style="background:#e0f2f1;border:2px solid #007a87;border-radius:12px;padding:20px;margin:10px 0;text-align:center;cursor:default;position:relative;">
                  <button onclick="this.parentElement.remove()" style="position:absolute;top:10px;right:10px;background:#ef4444;color:white;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-weight:bold;z-index:10;display:flex;align-items:center;justify-center:center;" title="Delete Video">X</button>
                  <strong style="color:#007a87;font-size:16px;">🎬 Video: ${data.url}</strong>
                </div><p><br></p>`;
                const doc = editorInstance.editorDocument || document;
                const node = doc.getElementById(id);
                if (node) { node.outerHTML = html; } else { editorInstance.s.insertHTML(html); }
                setTimeout(() => {
                  const val = editorInstance.value;
                  const inp = editorInstance.container?.closest('form')?.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;
                  if (inp) inp.value = val;
                }, 200);
              }
            } catch (err) {
              console.error(err);
              const doc = editorInstance.editorDocument || document;
              const node = doc.getElementById(id);
              if (node) node.innerHTML = 'Video upload failed.';
            }
          };
          input.click();
        }
      }
    ]
  }), [name]);

  // Force sync the latest content from Jodit into the hidden input right before the form submits.
  // This is crucial because if the user clicks the inline "X" delete button, Jodit's standard 
  // onChange/onBlur might miss the DOM mutation or fire too late.
  useEffect(() => {
    const form = hiddenInputRef.current?.closest('form');
    if (!form) return;
    
    const handleSubmit = () => {
       if (editorRef.current && hiddenInputRef.current) {
          hiddenInputRef.current.value = editorRef.current.value;
       }
    };
    
    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, []);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <input type="hidden" name={name} defaultValue={defaultValue || ""} ref={hiddenInputRef} />
      <JoditEditor
        ref={editorRef}
        value={content}
        config={config}
        onBlur={newContent => {
           setContent(newContent);
           if (hiddenInputRef.current) hiddenInputRef.current.value = newContent;
        }}
        onChange={newContent => {
           if (hiddenInputRef.current) hiddenInputRef.current.value = newContent;
        }}
      />
    </div>
  );
}
