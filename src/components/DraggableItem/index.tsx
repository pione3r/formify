import * as S from "./index.styles";
import { DraggableItemProps } from "./index.types";

export function DraggableItem({
  요소삭제,
  children,
  ...rest
}: DraggableItemProps) {
  return (
    <S.Wrapper {...rest}>
      <S.DragHandle
        src="/images/drag-handle.svg"
        alt="drag-handle"
        width={20}
        height={20}
        draggable={false}
      />
      <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      {요소삭제 && (
        <S.DeleteButton
          id="delete-button"
          onClick={(event) =>
            요소삭제(
              Number(event.currentTarget.parentElement?.dataset["index"]!)
            )
          }
          onMouseDown={(event) => event.stopPropagation()}
        >
          <S.DeleteButtonIcon
            src="/images/delete-button.svg"
            alt="delete-button"
            width={20}
            height={20}
          />
        </S.DeleteButton>
      )}
    </S.Wrapper>
  );
}
