import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 6px 20px;

  position: sticky;
  top: 0px;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.72);

  z-index: 100;
`;

export const NavWrapper = styled.nav`
  display: flex;
  gap: 10px;
`;

export const NavItem = styled(Link)`
  font-size: 1.6rem;
  font-weight: 600;
  color: black;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;
