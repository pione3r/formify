import { ButtonHTMLAttributes, ReactNode } from "react";

export interface SignInButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
