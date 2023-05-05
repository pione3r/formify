import ReactDOM from "react-dom";
import { PortalProps } from "./index.types";

export function Portal({ children, selector }: PortalProps) {
  const element =
    typeof window !== "undefined" && document.getElementById(selector);

  return element && children ? ReactDOM.createPortal(children, element) : null;
}
