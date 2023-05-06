import Head from "next/head";
import { useState } from "react";
import * as S from "./index.styles";

import { TextAskFormType } from "./index.types";

import { AskFormBoard } from "@/components/AskFormBoard";
import { DraggableItem } from "@/components/DraggableItem";
import { DummyTextAskForm } from "@/components/DummyAskForm/TextAskForm";
import { PickedAskFormBoard } from "@/components/PickedAskFormBoard";
import { TextAskForm } from "@/components/AskForm/TextAskForm";

import { useDraggable } from "@/hooks/useDraggable";
import { usePickedFormPosSwitch } from "@/hooks/usePickedFormPosSwitch";

export default function Form() {
  const [선택된질문리스트, set선택된질문리스트] = useState<TextAskFormType[]>(
    []
  );

  const 질문추가 = () => {
    const newId = Math.max(
      0,
      ...선택된질문리스트.map((질문) => Number.parseInt(질문.id))
    );
    set선택된질문리스트((prev) => [
      ...prev,
      { id: "" + (newId + 1), type: "text", askTitle: "" },
    ]);
  };

  const { onMouseDownHandler } = useDraggable(질문추가);

  const 질문순서바꾸기 = (sourceIdx: number, destinationIdx: number) => {
    const copied질문리스트 = [...선택된질문리스트];
    const moving질문 = copied질문리스트[sourceIdx];
    copied질문리스트.splice(sourceIdx, 1);
    copied질문리스트.splice(destinationIdx, 0, moving질문);
    set선택된질문리스트(copied질문리스트);
  };

  const { 폼순서바꾸기 } = usePickedFormPosSwitch(질문순서바꾸기);

  return (
    <>
      <Head>
        <title>폼 만들기</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <S.Wrapper>
        <AskFormBoard>
          <DraggableItem onMouseDown={onMouseDownHandler}>
            <DummyTextAskForm />
          </DraggableItem>
        </AskFormBoard>
        <PickedAskFormBoard>
          {선택된질문리스트.map((질문, index) => (
            <DraggableItem
              key={질문.id}
              className="draggable-item"
              data-index={index}
              onMouseDown={폼순서바꾸기}
              요소삭제={() => {
                const 삭제된질문 = [...선택된질문리스트];
                삭제된질문.splice(index, 1);
                set선택된질문리스트(삭제된질문);
              }}
            >
              <TextAskForm
                index={index}
                질문={질문}
                질문제목수정={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const 수정한제목 = event.target.value;
                  set선택된질문리스트((prev) =>
                    prev.map((item) =>
                      item.id === 질문.id
                        ? { ...item, askTitle: 수정한제목 }
                        : { ...item }
                    )
                  );
                }}
              />
            </DraggableItem>
          ))}
          <S.SubmitButton
            onClick={() => {
              // 비어있는 질문 있는지 검사
              for (const 질문 of 선택된질문리스트) {
                if (질문.askTitle === "") {
                  alert("비어있는 질문이 있습니다.");
                  return;
                }
              }

              const 정렬된질문리스트 = 선택된질문리스트.map((질문, index) => ({
                ...질문,
                id: "" + (index + 1),
              }));
              fetch("http://localhost:3000/api/form", {
                method: "POST",
                body: JSON.stringify(정렬된질문리스트),
              });
            }}
          >
            폼 제출
          </S.SubmitButton>
        </PickedAskFormBoard>
      </S.Wrapper>
    </>
  );
}
