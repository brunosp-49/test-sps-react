import React from "react";
import type { IconProps } from "./Icon.types";

const defaultSize = 20;

function ChevronDownIcon({ size = defaultSize }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default ChevronDownIcon;
