import * as S from "./index.styles";

export function DummyTextAskForm() {
  return (
    <S.Wrapper>
      <S.Title placeholder="질문 제목" />
      <S.Body placeholder="내용을 적어주세요" />
    </S.Wrapper>
  );
}
