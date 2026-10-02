import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id'?: string;
        'markdown-link-allowed-hosts'?: string;
        'markdown-link-include-www'?: string;
        'markdown-link-allow-http'?: string;
      };
    }
  }
}
