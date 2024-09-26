import { CodeBlock, dracula } from "react-code-blocks";

type InfoBlockProps = {
  title: string;
  description: string;
  code?: string;
};

export default function InfoBlock({
  title,
  description,
  code,
}: InfoBlockProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-poppins font-semibold text-neutral-700 dark:text-neutral-200 text-3xl">
        {title}
      </h2>
      <p className="font-poppins font-normal text-neutral-500 dark:text-neutral-300 text-lg">
        {description}
      </p>
      {code && (
        <CodeBlock
          text={code}
          language={"html"}
          showLineNumbers={true}
          theme={dracula}
        />
      )}
    </div>
  );
}
