import * as S from "./index.styles";
import { RadioButtonQuestionFormProps } from "./index.types";

export function RadioButtonQuestionForm({
  섹션Id,
  질문순서,
  질문제목,
  질문제목수정,
  선택지목록,
  선택지추가,
  선택지내용수정,
}: RadioButtonQuestionFormProps) {
  return (
    <S.Wrapper onMouseDown={(event) => event.stopPropagation()}>
      <S.Index>{`${질문순서 + 1}번 째 질문`}</S.Index>
      <S.Title
        placeholder="선택 질문 제목을 입력해주세요. ex) 타입을 선택해주세요"
        value={질문제목}
        onChange={질문제목수정}
      />
      <S.AnswerGroupWrapper>
        {선택지목록.map((선택지, index) => (
          <S.AnswerWrapper key={index}>
            <S.RadioButtonInput type="radio" name={`answer-${질문순서}`} />
            <S.RadioLabelInput
              placeholder="답변을 입력해주세요"
              value={선택지}
              onChange={(event) =>
                선택지내용수정(섹션Id, event, 질문순서, index)
              }
              spellCheck={false}
            />
          </S.AnswerWrapper>
        ))}
        <S.AddAnswerButton onClick={선택지추가}>
          답변 추가 버튼
        </S.AddAnswerButton>
      </S.AnswerGroupWrapper>
    </S.Wrapper>
  );
}
