import React from "react";

const ViewIcon = (props) => {
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
      <path d="M12 4.5C7.58 4.5 3.73 7.11 2 12c1.73 4.89 5.58 7.5 10 7.5s8.27-2.61 10-7.5c-1.73-4.89-5.58-7.5-10-7.5zm0 13c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 9 12 9s2.5 1.12 2.5 2.5S13.38 14 12 14z" />
    </svg>
  );
};

export default ViewIcon;
