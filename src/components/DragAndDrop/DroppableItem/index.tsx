import { ReactNode } from "react";
import * as S from "./index.styles";

export function DroppableItem({
  id,
  title,
  className,
  children,
}: {
  id?: string;
  title?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <S.Wrapper id={id} className={className}>
      <h1>{title}</h1>
      {children}
    </S.Wrapper>
  );
}
