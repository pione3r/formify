import * as S from "./index.styles";
import { SimpleTextQuestionFormProps } from "./index.types";

export function SimpleTextQuestionForm({
  질문아이디리스트,
  질문순서,
  질문제목,
  질문제목수정,
  다음질문,
  다음질문으로이동,
}: SimpleTextQuestionFormProps) {
  return (
    <S.Wrapper onMouseDown={(event) => event.stopPropagation()}>
      <S.Index>{`${질문순서 + 1}번 째 질문`}</S.Index>
      <S.Title
        placeholder="단답형 질문 제목을 입력해주세요."
        value={질문제목}
        onChange={(event) => 질문제목수정(event, 질문순서)}
        spellCheck={false}
      />
      <S.NextQuestionSelect
        onMouseDown={(event) => event.stopPropagation()}
        onChange={(event) => 다음질문으로이동(event, 질문순서)}
        value={다음질문}
      >
        <option value="" disabled>
          몇 번째 질문으로 이동할까요?
        </option>
        {질문아이디리스트.map((questionId) => (
          <option key={questionId} value={questionId}>
            {questionId}
          </option>
        ))}
        <option value="submit">제출</option>
      </S.NextQuestionSelect>
    </S.Wrapper>
  );
}
