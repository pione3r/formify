import * as S from "./index.styles";

import { Portal } from "../Portal";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { signInModalClose } from "@/stores/signInModalSlice";
import { SignInButton } from "../SigninButton";
import { signIn } from "next-auth/react";

export function SignInModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.signInModal.isOpen);
  return (
    <Portal selector="sign-in-modal-portal">
      {isOpen && (
        <S.Overlay onClick={() => dispatch(signInModalClose())}>
          <S.Wrapper onClick={(event) => event.stopPropagation()}>
            <SignInButton id="kakao" onClick={() => signIn("kakao")}>
              카카오 로그인
            </SignInButton>
          </S.Wrapper>
        </S.Overlay>
      )}
    </Portal>
  );
}
