import * as S from "./index.styles";
import { PickedAskFormBoardProps } from "./index.types";

export function PickedAskFormBoard({ children }: PickedAskFormBoardProps) {
  return (
    <S.Wrapper id="picked-askform-board">
      <S.Title>선택된 질문 폼</S.Title>
      <S.Body>{children}</S.Body>
    </S.Wrapper>
  );
}
