"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    // Forcefully adjust ElevenLabs chatbot position inside its Shadow DOM
    const interval = setInterval(() => {
      const el = document.querySelector('elevenlabs-convai');
      if (el && el.shadowRoot) {
        if (!el.shadowRoot.querySelector('#custom-el-style')) {
          const style = document.createElement('style');
          style.id = 'custom-el-style';
          // Shift the internal fixed overlay down precisely 35px to align with Emergency icon
          style.textContent = `
            div[class*="overlay"], div[class*="fixed"] {
              transform: translate(5px, 35px) !important;
            }
          `;
          el.shadowRoot.appendChild(style);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="lazyOnload" />
      {/* @ts-ignore */}
      <elevenlabs-convai agent-id="agent_1601knkda0vdfhxtasv9f0ae3zhq"></elevenlabs-convai>
    </>
  );
}
