import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: rgb(245, 245, 247);

  width: 70rem;
  min-height: 50rem;

  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
