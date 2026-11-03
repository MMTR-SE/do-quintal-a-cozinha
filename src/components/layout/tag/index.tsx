import { HTMLProps } from "react";

interface TagProps extends HTMLProps<HTMLDivElement> {
  title: string;
  caption: string;
  backgroundSrc?: "/pink-bg.webp";
}

export function Tag({ title, caption, ...props }: TagProps) {
  return (
    <div {...props}>
        <span className="title-lg font-bold title-white"> {title} </span>
      <p className="mt-3">{caption}</p>
    </div>
  );
}

// <div className="px-4 py-2 bg-purple-400/95 inline border border-dashed border-white grid place-items-center title-white title-sm font-medium">