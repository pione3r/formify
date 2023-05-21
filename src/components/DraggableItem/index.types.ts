import { HTMLAttributes, ReactNode } from "react";

export interface DraggableItemProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  요소삭제?: (index: number) => void;
}
