import React from "react";

const MainContent = ({ children }) => {
  return (
    <div
      className="h-full flex flex-col overflow-hidden py-2 px-0 w-[calc(100vw-240px)]"
      id="main_content"
    >
      <div className="rounded-md border px-2 h-full shadow-md">{children}</div>
    </div>
  );
};

export default MainContent;
