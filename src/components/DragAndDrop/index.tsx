import { ReactNode, useRef, useState } from "react";
import { useDraggable } from "./useDraggable";
import styled from "styled-components";
import { DraggableItem } from "./DraggableItem";

type TextAskType = {
  id: string;
  제목?: string;
  내용?: string;
};

export function DragAndDrop() {
  const [선택한질문리스트, set선택한질문리스트] = useState<TextAskType[]>([]);

  const isTouchScreen =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const { onMouseDownHandler, onTouchStartHandler } = useDraggable(
    isTouchScreen,
    set선택한질문리스트
  );

  const movingItemIdx = useRef<number>(0);
  const underMovingItemIdx = useRef<number>(0);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <AskFormBoard title="질문폼을 선택해주세요">
        <DraggableItem
          onMouseDown={onMouseDownHandler}
          onTouchStart={onTouchStartHandler}
        >
          <더미TextAskForm></더미TextAskForm>
        </DraggableItem>
      </AskFormBoard>
      <PickedAskFormBoard id="picked-askform-board">
        {선택한질문리스트.map((질문, index) => (
          <TextAskForm
            key={질문.id}
            질문={질문}
            제목수정={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              const 수정한제목 = event.target.value;
              set선택한질문리스트(
                선택한질문리스트.map((item) =>
                  item.id === 질문.id
                    ? { ...item, 제목: 수정한제목 }
                    : { ...item }
                )
              );
            }}
            내용수정={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              const 수정한내용 = event.target.value;
              set선택한질문리스트(
                선택한질문리스트.map((item) =>
                  item.id === 질문.id
                    ? { ...item, 내용: 수정한내용 }
                    : { ...item }
                )
              );
            }}
            onDragStart={() => (movingItemIdx.current = index)}
            onDragEnter={() => {
              underMovingItemIdx.current = index;
            }}
            onDragEnd={() => {
              const copied질문리스트 = [...선택한질문리스트];
              const moving질문 = copied질문리스트[movingItemIdx.current];
              copied질문리스트.splice(movingItemIdx.current, 1);
              copied질문리스트.splice(
                underMovingItemIdx.current,
                0,
                moving질문
              );
              movingItemIdx.current = 0;
              underMovingItemIdx.current = 0;
              set선택한질문리스트(copied질문리스트);
            }}
          />
        ))}
      </PickedAskFormBoard>
    </div>
  );
}

function PickedAskFormBoard({
  id,
  children,
}: {
  id: string;
  children?: ReactNode;
}) {
  return (
    <PickedAskFormBoardWrapper id={id}>{children}</PickedAskFormBoardWrapper>
  );
}

const PickedAskFormBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  height: 100vh;

  background-color: rgb(245, 245, 247);

  max-width: 50rem;
  max-height: 50rem;

  margin: 0 auto;
`;

function AskFormBoard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AskFormBoardWrapper>
      {<h1>{title}</h1>}
      {children}
    </AskFormBoardWrapper>
  );
}

const AskFormBoardWrapper = styled.div`
  width: 100%;
  height: 100vh;

  background-color: rgb(245, 245, 247);

  max-width: 50rem;
  max-height: 50rem;

  margin: 0 auto;
`;

function 더미TextAskForm() {
  return (
    <TextAskFormWrapper>
      <TextAskTitle placeholder="질문 제목" />
      <TextAskBody placeholder="내용을 적어주세요" />
    </TextAskFormWrapper>
  );
}

export function TextAskForm({
  질문,
  제목수정,
  내용수정,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: {
  질문: TextAskType;
  제목수정: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  내용수정: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}) {
  return (
    <TextAskFormWrapper
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      draggable
    >
      <TextAskTitle
        placeholder="질문 제목"
        value={질문.제목}
        onChange={제목수정}
      />
      <TextAskBody
        placeholder="내용을 적어주세요"
        value={질문.내용}
        onChange={내용수정}
      />
    </TextAskFormWrapper>
  );
}

const TextAskFormWrapper = styled.div`
  background-color: tomato;
`;

const TextAskTitle = styled.textarea`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 2.75rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: #212529;
`;

const TextAskBody = styled.textarea`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 1.4rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: #212529;
`;
