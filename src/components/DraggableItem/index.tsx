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
      {children}
      {요소삭제 && (
        <S.DeleteButton
          id="delete-button"
          onClick={요소삭제}
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
