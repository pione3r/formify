import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #ffffff;

  margin: 20px;
  padding: 20px;

  border-radius: 20px;

  user-select: none;
`;

export const Title = styled.textarea`
  display: block;

  font-size: 2.5rem;
  font-weight: bold;
  color: #212529;

  resize: none;
  outline: none;
  border: 1px solid limegreen;
`;

export const Body = styled.textarea`
  display: block;

  font-size: 1.6rem;
  font-weight: bold;
  color: #212529;

  resize: none;
  outline: none;
  border: 1px solid limegreen;
`;
