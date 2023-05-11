import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 40px;

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
  font-size: 2rem;
  font-weight: 600;
  color: #000000;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavItem = styled(Link)`
  font-size: 1.6rem;
  font-weight: 500;
  color: #000000;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;
