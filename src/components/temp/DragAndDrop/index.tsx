import { ReactNode, useState } from "react";
import { useDraggable } from "./useDraggable";
import styled from "styled-components";
import { DraggableItem } from "./DraggableItem";
import { DummyTextAskForm } from "./DummyAskForm/TextAskForm";

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

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <AskFormBoard title="질문폼을 선택해주세요">
        <DraggableItem
          onMouseDown={onMouseDownHandler}
          onTouchStart={onTouchStartHandler}
        >
          <DummyTextAskForm></DummyTextAskForm>
        </DraggableItem>
      </AskFormBoard>
      <PickedAskFormBoard id="picked-askform-board">
        {선택한질문리스트.map((질문, index) => (
          <TextAskForm
            index={index}
            key={질문.id}
            className="draggable-item"
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
            onMouseDown={(mouseDownEvent: React.MouseEvent) => {
              let currentSourceItem: HTMLElement | undefined | null;
              let currentDestinationItem: HTMLElement | undefined | null;
              let currentSourceIndex: number;
              let currentDestinationIndex: number;

              const 이동할질문폼 = (
                mouseDownEvent.target as HTMLElement
              ).closest<HTMLElement>(".draggable-item");

              if (!이동할질문폼) return;

              const 이동할질문폼Pos = 이동할질문폼.getBoundingClientRect();

              const 이동할질문폼복사본 = 이동할질문폼.cloneNode(
                true
              ) as HTMLElement;

              이동할질문폼복사본.style.position = "fixed";
              이동할질문폼복사본.style.top = `${이동할질문폼Pos.top}px`;
              이동할질문폼복사본.style.left = `${이동할질문폼Pos.left}px`;
              이동할질문폼복사본.style.width = `${이동할질문폼Pos.width}px`;
              이동할질문폼복사본.style.height = `${이동할질문폼Pos.height}px`;
              이동할질문폼복사본.style.pointerEvents = "none";

              이동할질문폼복사본.style.border = "2px solid rgb(96 165 250)";
              이동할질문폼복사본.style.opacity = "0.95";
              이동할질문폼복사본.style.boxShadow =
                "0 30px 60px rgba(0, 0, 0, .2)";
              이동할질문폼복사본.style.transform = "scale(1.05)";
              이동할질문폼복사본.style.transition =
                "transform 200ms ease, opacity 200ms ease, boxShadow 200ms ease";

              이동할질문폼.style.opacity = "0.5";
              이동할질문폼.style.cursor = "grabbing";

              document.body.style.cursor = "grabbing";
              document.body.appendChild(이동할질문폼복사본);

              const onMouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
                const dX = mouseMoveEvent.pageX - mouseDownEvent.pageX;
                const dY = mouseMoveEvent.pageY - mouseDownEvent.pageY;

                이동할질문폼복사본.style.top = `${이동할질문폼Pos.top + dY}px`;
                이동할질문폼복사본.style.left = `${
                  이동할질문폼Pos.left + dX
                }px`;

                const 이동할질문폼복사본Pos =
                  이동할질문폼복사본.getBoundingClientRect();

                currentDestinationItem = document
                  .elementFromPoint(
                    이동할질문폼복사본Pos.left +
                      이동할질문폼복사본Pos.width / 2,
                    이동할질문폼복사본Pos.top + 이동할질문폼복사본Pos.height / 2
                  )
                  ?.closest<HTMLElement>(".draggable-item");
                currentDestinationIndex = Number(
                  currentDestinationItem?.dataset.index
                );

                currentSourceItem = 이동할질문폼;
                currentSourceIndex = Number(currentSourceItem.dataset.index);

                if (currentDestinationItem?.isSameNode(currentSourceItem))
                  return;
              };

              const onMouseUpHandler = () => {
                document.body.removeAttribute("style");

                const 이동할질문폼Pos = 이동할질문폼.getBoundingClientRect();
                이동할질문폼복사본.style.left = `${이동할질문폼Pos.left}px`;
                이동할질문폼복사본.style.top = `${이동할질문폼Pos.top}px`;
                이동할질문폼복사본.style.opacity = "1";
                이동할질문폼복사본.style.transform = "none";
                이동할질문폼복사본.style.borderWidth = "0px";
                이동할질문폼복사본.style.boxShadow =
                  "0 1px 3px rgba(0, 0, 0, 0.15)";
                이동할질문폼복사본.style.transition = "all 200ms ease";

                이동할질문폼복사본.addEventListener(
                  "transitionend",
                  () => {
                    이동할질문폼.removeAttribute("style");
                    document.body.removeAttribute("style");
                    이동할질문폼복사본.remove();

                    if (currentDestinationItem) {
                      const copied질문리스트 = [...선택한질문리스트];
                      const moving질문 = copied질문리스트[currentSourceIndex];
                      copied질문리스트.splice(currentSourceIndex, 1);
                      copied질문리스트.splice(
                        currentDestinationIndex,
                        0,
                        moving질문
                      );
                      set선택한질문리스트(copied질문리스트);
                    }
                  },
                  { once: true }
                );

                document.removeEventListener("mousemove", onMouseMoveHandler);
              };

              document.addEventListener("mousemove", onMouseMoveHandler);
              document.addEventListener("mouseup", onMouseUpHandler, {
                once: true,
              });
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

export function TextAskForm({
  index,
  className,
  질문,
  제목수정,
  내용수정,
  onMouseDown,
}: {
  index: number;
  className: string;
  질문: TextAskType;
  제목수정: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  내용수정: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onMouseDown: (mouseDownEvent: React.MouseEvent) => void;
}) {
  return (
    <TextAskFormWrapper
      data-index={index}
      className={className}
      onMouseDown={onMouseDown}
    >
      <TextAskTitle
        placeholder="질문 제목"
        value={질문.제목}
        onChange={제목수정}
        onMouseDown={(event) => event.stopPropagation()}
      />
      <TextAskBody
        placeholder="내용을 적어주세요"
        value={질문.내용}
        onChange={내용수정}
        onMouseDown={(event) => event.stopPropagation()}
      />
    </TextAskFormWrapper>
  );
}

const TextAskFormWrapper = styled.div`
  padding: 20px;

  user-select: none;
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

  background-color: tomato;
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

  background-color: tomato;
`;
