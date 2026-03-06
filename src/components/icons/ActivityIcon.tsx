import React from "react";
import type { IconProps } from "./Icon.types";

const defaultSize = 24;

function ActivityIcon({ size = defaultSize }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ display: "block", flexShrink: 0 }}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export default ActivityIcon;
