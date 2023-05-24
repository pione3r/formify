import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 40px;

  position: sticky;
  top: 0px;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.72);

  z-index: 100;
`;

export const SubWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogo = styled(Link)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const NavItem = styled(Link)`
  font-size: 1.8rem;
  color: #000000;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:hover::after {
    content: "";

    display: block;
    width: 100%;
    height: 2px;
    background-color: #000000;
  }
`;

export const SignOutButton = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;

  background-color: #000000;

  padding: 8px 16px;

  border-radius: 16px;

  cursor: pointer;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;

export const SignInButton = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;

  background-color: #000000;

  padding: 8px 16px;

  border-radius: 16px;

  cursor: pointer;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
`;
