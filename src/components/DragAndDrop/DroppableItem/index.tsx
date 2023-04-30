import * as S from "./index.styles";
import { DroppableItemProps } from "./index.types";

export function DroppableItem({ children }: DroppableItemProps) {
  return <S.Wrapper>{children}</S.Wrapper>;
}
