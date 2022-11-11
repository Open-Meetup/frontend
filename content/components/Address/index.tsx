import React from "react";

interface Props {
  address: string;
}

const Address = ({ address }: Props) => (
  <>
    {address.slice(0, 6)}*****
    {address.slice(-4)}
  </>
);

export default Address;
