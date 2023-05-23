import * as S from "./index.styles";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { signInModalClose } from "@/stores/signInModalSlice";

import { signIn } from "next-auth/react";

import { Portal } from "@/components/Portal";

export function SignInModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.signInModal.isOpen);
  return (
    <Portal selector="sign-in-modal-portal">
      {isOpen && (
        <S.Overlay onClick={() => dispatch(signInModalClose())}>
          <S.Wrapper onClick={(event) => event.stopPropagation()}>
            <S.GoogleLoginButtonWrapper onClick={() => signIn("google")}>
              <S.GoogleLogo
                src="/images/google-logo.png"
                alt="google-logo"
                width={20}
                height={20}
              />
              <S.ButtonLabel>Continue with Google</S.ButtonLabel>
            </S.GoogleLoginButtonWrapper>
          </S.Wrapper>
        </S.Overlay>
      )}
    </Portal>
  );
}
