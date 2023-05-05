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
      <S.HeaderItem href="/">메인 페이지</S.HeaderItem>
      {status !== "authenticated" && (
        <SignInButton onClick={() => dispatch(signInModalOpen())}>
          로그인
        </SignInButton>
      )}
    </S.Wrapper>
  );
}
