import React, { FC } from "react";
import { useFormattedAddress } from "./Address.hooks";

import "./Address.scss";

interface IAddressProps {
  address: string;
}

export const Address: FC<IAddressProps> = ({ address }) => {
  const formattedAddress = useFormattedAddress(address);

  return <div className="address">{formattedAddress}</div>;
};
