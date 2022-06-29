import React from "react";

export function MenuBurger() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        width="40px"
        height="40px"
      >
        <path fill="#c2e8ff" d="M2.5 36.5H77.5V43.5H2.5z" />
        <path fill="#7496c4" d="M77,37v6H3v-6H77 M78,36H2v8h76V36L78,36z" />
        <path fill="#c2e8ff" d="M2.5 16.5H77.5V23.5H2.5z" />
        <path fill="#7496c4" d="M77,17v6H3v-6H77 M78,16H2v8h76V16L78,16z" />
        <g>
          <path fill="#c2e8ff" d="M2.5 56.5H77.5V63.5H2.5z" />
          <path fill="#7496c4" d="M77,57v6H3v-6H77 M78,56H2v8h76V56L78,56z" />
        </g>
      </svg>{" "}
    </div>
  );
}
