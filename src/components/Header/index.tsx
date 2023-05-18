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
      <S.SubWrapper>
        <S.HeaderLogo href="/">Formify</S.HeaderLogo>
        <S.NavWrapper>
          {status === "authenticated" ? (
            <>
              <S.NavItem href="/ask-form">폼 생성하기</S.NavItem>
              <S.NavItem href={`/ask-forms/${session.user?.email}`}>
                내가 만든 폼 보기
              </S.NavItem>
              <SignInButton onClick={() => signOut()}>로그아웃</SignInButton>
            </>
          ) : (
            <SignInButton onClick={() => dispatch(signInModalOpen())}>
              로그인
            </SignInButton>
          )}
        </S.NavWrapper>
      </S.SubWrapper>
    </S.Wrapper>
  );
}
