import styled from "styled-components";

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.84);

  z-index: 1000;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;

  border-radius: 12px;

  padding: 20px;
`;
