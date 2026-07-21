export function RichBody({ body }: { body: string }) {
  const sections = body.split(/^## /m).filter(Boolean);
  return (
    <div className="rich-body">
      {sections.map((section) => {
        const [title, ...lines] = section.split(/\r?\n/);
        const blocks = lines.join("\n").trim().split(/\n\s*\n/).filter(Boolean);
        return (
          <section key={title}>
            <h2>{title.trim()}</h2>
            {blocks.map((block) => {
              if (block.split(/\r?\n/).every((line) => line.startsWith("- "))) {
                return <ul key={block}>{block.split(/\r?\n/).map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
              }
              return <p key={block}>{block.replace(/\r?\n/g, " ")}</p>;
            })}
          </section>
        );
      })}
    </div>
  );
}
