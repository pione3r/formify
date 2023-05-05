import * as S from "./index.styles";

import { SignInButton } from "../SigninButton";

import { signInModalOpen } from "@/stores/signInModalSlice";
import { useAppDispatch } from "@/stores/hooks";
import { useSession } from "next-auth/react";

export function Header() {
  const dispatch = useAppDispatch();

  const { status } = useSession();

  return (
    <S.Wrapper>
      <S.NavWrapper>
        <S.NavItem href="/">메인 페이지</S.NavItem>
        {status === "authenticated" &&
          window.location.pathname !== "/form" && (
            <S.NavItem href="/form">폼 생성 페이지</S.NavItem>
          )}
      </S.NavWrapper>
      {status !== "authenticated" && (
        <SignInButton onClick={() => dispatch(signInModalOpen())}>
          로그인
        </SignInButton>
      )}
    </S.Wrapper>
  );
}
