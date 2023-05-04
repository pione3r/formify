import * as S from "./index.styles";
import { AskFormBoardProps } from "./index.types";

export function AskFormBoard({ children }: AskFormBoardProps) {
  return (
    <S.Wrapper>
      <S.Title>질문선택폼</S.Title>
      <S.Body>{children}</S.Body>
    </S.Wrapper>
  );
}
