import Image from "next/image";
import * as S from "./index.styles";
import { TextAskFormProps } from "./index.types";

export function TextAskForm({
  index = 0,
  질문 = { id: "", type: "text", askTitle: "" },
  질문제목수정,
}: TextAskFormProps) {
  return (
    <S.Wrapper>
      <S.Index>{`${index + 1}번 째 질문`}</S.Index>
      <S.Title
        placeholder="질문 제목을 입력해주세요. ex) 생년월일을 답변해주세요"
        value={질문.askTitle}
        onChange={질문제목수정}
        readOnly={질문.askTitle === "더미질문"}
        onMouseDown={(event) => event.stopPropagation()}
      />
    </S.Wrapper>
  );
}
