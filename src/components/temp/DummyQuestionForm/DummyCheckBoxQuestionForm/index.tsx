import * as S from "./index.styles";

export function DummyCheckBoxQuestionForm() {
  return (
    <S.Wrapper>
      <S.Index>{`1번 째 질문`}</S.Index>
      <S.Title>
        {"선택 질문 제목을 입력해주세요. ex) 해당하는 항목에 체크해주세요"}
      </S.Title>
      <S.AnswerGroupWrapper>
        <S.AnswerWrapper>
          <S.RadioButtonInput type="checkbox"></S.RadioButtonInput>
          <S.RadioLabelInput>답변 1</S.RadioLabelInput>
        </S.AnswerWrapper>
      </S.AnswerGroupWrapper>
    </S.Wrapper>
  );
}
