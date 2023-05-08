import * as S from "./index.styles";
import { SimpleTextQuestionFormProps } from "./index.types";

export function SimpleTextQuestionForm({
  질문순서,
  질문제목,
  질문제목수정,
}: SimpleTextQuestionFormProps) {
  return (
    <S.Wrapper onMouseDown={(event) => event.stopPropagation()}>
      <S.Index>{`${질문순서 + 1}번 째 질문`}</S.Index>
      <S.Title
        placeholder="질문 제목을 입력해주세요. ex) 생년월일을 답변해주세요"
        value={질문제목}
        onChange={질문제목수정}
      />
    </S.Wrapper>
  );
}
