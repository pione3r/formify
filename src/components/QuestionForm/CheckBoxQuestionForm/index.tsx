import * as S from "./index.styles";
import { CheckBoxQuestionFormProps } from "./index.types";

export function CheckBoxQuestionForm({
  질문아이디리스트,
  질문순서,
  질문제목,
  질문제목수정,
  선택지목록,
  선택지추가,
  선택지내용수정,
  다음질문,
  다음질문으로이동,
}: CheckBoxQuestionFormProps) {
  return (
    <S.Wrapper onMouseDown={(event) => event.stopPropagation()}>
      <S.Index>{`${질문순서 + 1}번 째 질문`}</S.Index>
      <S.Title
        placeholder="다중 선택형 질문 제목을 입력해주세요."
        value={질문제목}
        onChange={(event) => 질문제목수정(event, 질문순서)}
      ></S.Title>
      <S.AddAnswerButton onClick={() => 선택지추가(질문순서)}>
        답변 추가 버튼
      </S.AddAnswerButton>
      <S.AnswerGroupWrapper>
        {선택지목록.map((선택지, index) => (
          <S.AnswerWrapper key={index}>
            <S.CheckBoxInput type="checkbox" />
            <S.CheckBoxLabelInput
              placeholder="답변을 입력해주세요"
              value={선택지}
              onChange={(event) => 선택지내용수정(event, 질문순서, index)}
              spellCheck={false}
            />
          </S.AnswerWrapper>
        ))}
      </S.AnswerGroupWrapper>
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
