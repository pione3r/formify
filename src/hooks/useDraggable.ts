export function useDraggable(질문추가: () => void) {
  return {
    onMouseDownHandler: (mouseDownEvent: React.MouseEvent) => {
      const element = mouseDownEvent.currentTarget as HTMLElement;

      const elementPos = element.getBoundingClientRect();

      const copiedElement = element.cloneNode(true) as HTMLElement;

      copiedElement.style.position = "absolute";
      copiedElement.style.top = `${elementPos.top}px`;
      copiedElement.style.left = `${elementPos.left + 10}px`;
      copiedElement.style.pointerEvents = "none";
      copiedElement.style.textShadow = "0 30px 60px rgba(0, 0, 0, .3)";
      copiedElement.style.transform = "scale(1.2)";
      copiedElement.style.transition = "transform 200ms ease";

      element.style.opacity = "0.5";
      element.style.cursor = "grabbing";

      document.body.style.cursor = "grabbing";
      document.body.appendChild(copiedElement);

      const onMouseMoveHandler = (moveEvent: MouseEvent) => {
        const dX = moveEvent.pageX - mouseDownEvent.pageX;
        const dY = moveEvent.pageY - mouseDownEvent.pageY;

        copiedElement.style.top = `${elementPos.top + dY}px`;
        copiedElement.style.left = `${elementPos.left + dX}px`;
      };

      const onMouseUpHandler = () => {
        const copiedElementPos = copiedElement.getBoundingClientRect();
        const copiedElementCenterX =
          copiedElementPos.left + copiedElementPos.width / 2;
        const copiedElementCenterY =
          copiedElementPos.top + copiedElementPos.height / 2;

        const droppableItem = document
          .elementFromPoint(copiedElementCenterX, copiedElementCenterY)
          ?.closest<HTMLElement>("#picked-askform-board");

        if (droppableItem) {
          const droppableItemPos = droppableItem.getBoundingClientRect();
          copiedElement.style.left = `${droppableItemPos.left}px`;
          copiedElement.style.top = `${droppableItemPos.top}px`;
          질문추가();
        } else {
          copiedElement.style.left = `${elementPos.left}px`;
          copiedElement.style.top = `${elementPos.top}px`;
        }

        copiedElement.style.transition = "all 100ms ease";
        copiedElement.style.left = `${elementPos.left}px`;
        copiedElement.style.top = `${elementPos.top}px`;
        copiedElement.style.transform = "none";

        copiedElement.addEventListener(
          "transitionend",
          () => {
            element.removeAttribute("style");
            document.body.removeAttribute("style");
            copiedElement.remove();
          },
          { once: true }
        );

        document.removeEventListener("mousemove", onMouseMoveHandler);
      };

      document.addEventListener("mousemove", onMouseMoveHandler);
      document.addEventListener("mouseup", onMouseUpHandler, {
        once: true,
      });
    },
  };
}
