import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose max-w-none dark:prose-invert p-4">
    <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]} // 👈 Esto permite HTML
      breaks={true} // Habilita los saltos de línea automáticos
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <>
              {String(children).replace(/\n$/, "")}
              </>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
  );
};

export default MarkdownRenderer;
