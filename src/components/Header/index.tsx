import * as S from "./index.styles";

import { SignInButton } from "../SigninButton";

import { signInModalOpen } from "@/stores/signInModalSlice";
import { useAppDispatch } from "@/stores/hooks";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();

  return (
    <S.Wrapper>
      <S.NavWrapper>
        <S.NavItem href="/">메인 페이지</S.NavItem>
        {status === "authenticated" && (
          <>
            <S.NavItem href="/ask-form">폼 생성 페이지</S.NavItem>
            <S.NavItem href={`/forms/${session.user?.email}`}>
              내가 만든 질문 보기
            </S.NavItem>
          </>
        )}
      </S.NavWrapper>
      {status !== "authenticated" && (
        <SignInButton onClick={() => dispatch(signInModalOpen())}>
          로그인
        </SignInButton>
      )}
      {status === "authenticated" && (
        <SignInButton onClick={() => signOut()}>로그아웃</SignInButton>
      )}
    </S.Wrapper>
  );
}
