import * as S from "./index.styles";

export function DummyRadioButtonQuestionForm() {
  return (
    <S.Wrapper>
      <S.Index>{`1번 째 질문`}</S.Index>
      <S.Title>
        {"선택 질문 제목을 입력해주세요. ex) 타입을 선택해주세요"}
      </S.Title>
      <S.AnswerGroupWrapper>
        <S.AnswerWrapper>
          <S.RadioButtonInput type="radio"></S.RadioButtonInput>
          <S.RadioLabelInput>답변 1</S.RadioLabelInput>
        </S.AnswerWrapper>
      </S.AnswerGroupWrapper>
    </S.Wrapper>
  );
}
