import React, { FC } from "react";
import { useFormattedAddress } from "./Address.hooks";

import styles from "./Address.module.scss";

interface IAddressProps {
  address: string;
}

export const Address: FC<IAddressProps> = ({ address }) => {
  const formattedAddress = useFormattedAddress(address);

  return <div className={styles.address}>{formattedAddress}</div>;
};
