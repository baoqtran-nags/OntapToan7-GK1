import React, { useMemo } from 'react';
import katex from 'katex';

interface Props {
  content: string;
  className?: string;
  inline?: boolean;
}

export const MathText: React.FC<Props> = ({ content, className = '', inline = false }) => {
  const renderedElements = useMemo(() => {
    if (!content) return [];

    // Regex to find math blocks:
    // 1. $$ ... $$ (display)
    // 2. \[ ... \] (display)
    // 3. \( ... \) (inline)
    // 4. $ ... $ (inline)
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$\n]+?\$)/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      // Add preceding plain text
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>
        );
      }

      const rawMath = match[0];
      let mathCode = '';
      let isDisplay = false;

      if (rawMath.startsWith('$$') && rawMath.endsWith('$$')) {
        mathCode = rawMath.slice(2, -2).trim();
        isDisplay = true;
      } else if (rawMath.startsWith('\\[') && rawMath.endsWith('\\]')) {
        mathCode = rawMath.slice(2, -2).trim();
        isDisplay = true;
      } else if (rawMath.startsWith('\\(') && rawMath.endsWith('\\)')) {
        mathCode = rawMath.slice(2, -2).trim();
        isDisplay = false;
      } else if (rawMath.startsWith('$') && rawMath.endsWith('$')) {
        mathCode = rawMath.slice(1, -1).trim();
        isDisplay = false;
      }

      try {
        const html = katex.renderToString(mathCode, {
          displayMode: isDisplay,
          throwOnError: false,
        });

        parts.push(
          <span
            key={`math-${match.index}`}
            className="inline-math mx-0.5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (e) {
        console.error('KaTeX rendering error:', e);
        parts.push(
          <span key={`math-err-${match.index}`} className="font-mono text-slate-700">
            {mathCode}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Add trailing plain text
    if (lastIndex < content.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  }, [content]);

  if (inline) {
    return <span className={className}>{renderedElements}</span>;
  }

  return <div className={`whitespace-pre-line leading-relaxed ${className}`}>{renderedElements}</div>;
};
