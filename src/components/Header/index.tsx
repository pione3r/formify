import * as S from "./index.styles";

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
              <S.NavItem href="/survey/edit">폼 생성</S.NavItem>
              <S.NavItem href={`/surveys/${session.user?.email}`}>
                내가 만든 폼
              </S.NavItem>
              <S.SignOutButton onClick={() => signOut()}>
                로그아웃
              </S.SignOutButton>
            </>
          ) : (
            <S.SignInButton onClick={() => dispatch(signInModalOpen())}>
              로그인
            </S.SignInButton>
          )}
        </S.NavWrapper>
      </S.SubWrapper>
    </S.Wrapper>
  );
}
