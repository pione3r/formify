import styled from "styled-components";

import Link from "next/link";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: 50rem;

  margin: 0 auto;
  padding: 20px;

  border-radius: 12px;

  background-color: rgb(245, 245, 247);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormWrapper = styled(Link)`
  text-decoration: none;
  color: #000000;

  background-color: #ffffff;
  padding: 20px;

  border-radius: 16px;

  cursor: pointer;

  transition: all 0.2s ease-in-out 0s;

  &:hover {
    text-decoration: none;

    box-shadow: rgb(0 0 0 / 12%) 6px 8px 16px;
    transform: translateY(-2px);
  }
`;

export const Created = styled.div`
  font-size: 1.3rem;
`;

export const FormMaker = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;

// export const
