import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={key++} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      tokens.push(
        <em key={key++} className="italic text-slate-200">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300 font-mono text-[0.85em]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = href.startsWith('http');
        tokens.push(
          <a
            key={key++}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
          >
            {label}
          </a>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      elements.push(<hr key={blockKey++} className="my-8 border-white/10" />);
      i++;
      continue;
    }

    // Heading 2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={blockKey++}
          className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-9 mb-3 leading-snug"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={blockKey++}
          className="text-lg sm:text-xl font-medium text-slate-100 tracking-tight mt-7 mb-2.5 leading-snug"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Standalone Image: ![alt](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      elements.push(
        <figure key={blockKey++} className="my-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || 'Imagem ilustrativa do conteúdo'}
            className="w-full rounded-xl border border-white/10 object-cover max-h-[520px]"
            loading="lazy"
          />
          {alt && (
            <figcaption className="text-xs text-slate-500 font-mono mt-2 text-center">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={blockKey++}
          className="my-6 pl-5 pr-4 py-4 border-l-2 border-blue-400 bg-blue-500/[0.05] rounded-r-xl text-slate-200 italic text-sm sm:text-base leading-relaxed"
        >
          {renderInline(quoteLines.join(' '))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={blockKey++} className="my-5 space-y-2.5 pl-5 list-disc marker:text-blue-400">
          {items.map((item, idx) => (
            <li key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={blockKey++} className="my-5 space-y-2.5 pl-5 list-decimal marker:text-emerald-400">
          {items.map((item, idx) => (
            <li key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph (join consecutive plain text lines)
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('> ') &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^!\[[^\]]*\]\([^)]+\)$/.test(lines[i].trim()) &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    elements.push(
      <p
        key={blockKey++}
        className="text-slate-300 text-sm sm:text-base leading-relaxed font-light my-4"
      >
        {renderInline(paragraphLines.join(' '))}
      </p>
    );
  }

  return <div className="prose-mage">{elements}</div>;
}

