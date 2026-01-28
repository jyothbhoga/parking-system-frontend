import React from "react";

const FileDownloadIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 8v2h14v-2H5z" />
    </svg>
  );
};

export default FileDownloadIcon;
