import * as S from "./index.styles";
import { SignInButtonProps } from "./index.types";

export function SignInButton({ children, ...rest }: SignInButtonProps) {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
}
