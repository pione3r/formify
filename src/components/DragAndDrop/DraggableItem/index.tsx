import * as S from "./index.styles";
import { DraggableItemProps } from "./index.types";

export function DraggableItem({ children, ...rest }: DraggableItemProps) {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
}
