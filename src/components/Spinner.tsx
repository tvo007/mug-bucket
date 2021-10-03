import { Overlay } from "../styles";
import { FC } from "react";
export const Spinner: FC = ({ children }) => {
  return <Overlay children={children} />;
};
