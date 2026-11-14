import { Fragment } from "react";

/**
 * Display type needs a little hand-kerning: in Bodoni the apostrophe sits
 * too far from the letter after it at headline sizes. This closes the gap.
 * Use it for large headings that contain an apostrophe.
 */
export function DisplayText({ children }: { children: string }) {
  const parts = children.split("’");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? <span className="-ml-[0.01em] tracking-[-0.07em]">’</span> : null}
        </Fragment>
      ))}
    </>
  );
}
