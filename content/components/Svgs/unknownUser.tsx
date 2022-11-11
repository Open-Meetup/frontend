import React from "react";

interface Props {
  type: "guest" | "onlyAddress";
}

const UnknownUser = ({ type }: Props) => {
  switch (type) {
    case "guest":
      return (
        <svg
          height="46px"
          version="1.1"
          viewBox="0 0 52 46"
          width="52px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeDasharray="1"
            strokeWidth="1"
          >
            <path
              d="M26,-2 L47.6506351,10.5 L47.6506351,35.5 L26,48 L4.34936491,35.5 L4.34936491,10.5 L26,-2 Z"
              stroke="#808080"
              transform="translate(26.000000, 23.000000) rotate(-270.000000) translate(-26.000000, -23.000000) "
            />
          </g>
        </svg>
      );
      break;
    case "onlyAddress":
      return (
        <svg
          height="46px"
          version="1.1"
          viewBox="0 0 52 46"
          width="52px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <polygon
              id="unknownUser-onlyAddress-path-1"
              points="25 0 46.6506351 12.5 46.6506351 37.5 25 50 3.34936491 37.5 3.34936491 12.5"
            />
          </defs>
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g transform="translate(1.000000, -2.000000)">
              <path
                d="M25,0 L46.6506351,12.5 L46.6506351,37.5 L25,50 L3.34936491,37.5 L3.34936491,12.5 L25,0 Z"
                id="Polygon"
                stroke="#808080"
                strokeDasharray="1"
                transform="translate(25.000000, 25.000000) rotate(-270.000000) translate(-25.000000, -25.000000) "
              />
              <g>
                <mask fill="white" id="unknownUser-onlyAddress-mask-2">
                  <use xlinkHref="#unknownUser-onlyAddress-path-1" />
                </mask>
                <g transform="translate(25.000000, 25.000000) rotate(-270.000000) translate(-25.000000, -25.000000) " />
                <path
                  d="M19.8259612,30.5591374 C16.9331931,28.8066918 15,25.6291066 15,22 C15,16.4771525 19.4771525,12 25,12 C30.5228475,12 35,16.4771525 35,22 C35,25.6291066 33.0668069,28.8066918 30.1740388,30.5591374 C40.9418985,32.9251256 49,42.5215276 49,54 C49,67.254834 38.254834,78 25,78 C11.745166,78 1,67.254834 1,54 C1,42.5215276 9.05810147,32.9251256 19.8259612,30.5591374 Z"
                  mask="url(#unknownUser-onlyAddress-mask-2)"
                  stroke="#808080"
                  strokeDasharray="1"
                />
              </g>
            </g>
          </g>
        </svg>
      );
      break;
  }
};

export default UnknownUser;
