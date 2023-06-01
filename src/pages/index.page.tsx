import Head from "next/head";
import * as S from "./index.styles";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (document.querySelector("#video") as HTMLVideoElement).playbackRate = 0.5;
  }, []);

  return (
    <>
      <Head>
        <title>Formify</title>
      </Head>
      <S.Wrapper>
        <S.HeaderWrapper>
          <S.SubTitle>
            간단한 퀴즈부터, 설문 조사 등 응답이 필요한 경우 쉽게 만드세요
          </S.SubTitle>
          <S.Title>Formify</S.Title>
        </S.HeaderWrapper>
        <S.Video
          id="video"
          src="/images/make-ask-form.mov"
          autoPlay
          loop
          muted
        />
      </S.Wrapper>
    </>
  );
}
