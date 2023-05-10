import * as S from "./index.styles";
import { CheckBoxQuestionFormProps } from "./index.types";

export function CheckBoxQuestionForm({
  질문순서,
  질문제목,
  질문제목수정,
  선택지목록,
  선택지추가,
  선택지내용수정,
}: CheckBoxQuestionFormProps) {
  return (
    <S.Wrapper onMouseDown={(event) => event.stopPropagation()}>
      <S.Index>{`${질문순서 + 1}번 째 질문`}</S.Index>
      <S.Title
        placeholder="선택 질문 제목을 입력해주세요. ex) 해당하는 항목에 체크해주세요"
        value={질문제목}
        onChange={질문제목수정}
      ></S.Title>
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
        <S.AddAnswerButton onClick={() => 선택지추가(질문순서)}>
          답변 추가 버튼
        </S.AddAnswerButton>
      </S.AnswerGroupWrapper>
    </S.Wrapper>
  );
}
