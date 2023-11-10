import { Icons } from "../assets";
import { Token } from "../types";

export const iconByToken = {
  [Token.USDC]: <Icons.Usdc />,
  [Token.USDT]: <Icons.Usdt />,
  [Token.WBTC]: <Icons.Btc />,
  [Token.WETH]: <Icons.Eth />,
};
