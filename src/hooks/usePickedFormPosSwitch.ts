export function usePickedFormPosSwitch(
  순서바꾸기: (sourceIdx: number, destinationIdx: number) => void
) {
  return {
    폼순서바꾸기: (mouseDownEvent: React.MouseEvent) => {
      let currentSourceItem: HTMLElement | undefined | null;
      let currentDestinationItem: HTMLElement | undefined | null;
      let currentSourceIndex: number;
      let currentDestinationIndex: number;

      const 이동할질문폼 = (
        mouseDownEvent.target as HTMLElement
      ).closest<HTMLElement>(".draggable-item");

      if (!이동할질문폼) return;

      const 이동할질문폼Pos = 이동할질문폼.getBoundingClientRect();

      const 이동할질문폼복사본 = 이동할질문폼.cloneNode(true) as HTMLElement;

      이동할질문폼복사본.style.position = "fixed";
      이동할질문폼복사본.style.top = `${이동할질문폼Pos.top}px`;
      이동할질문폼복사본.style.left = `${이동할질문폼Pos.left}px`;
      이동할질문폼복사본.style.width = `${이동할질문폼Pos.width}px`;
      이동할질문폼복사본.style.height = `${이동할질문폼Pos.height}px`;
      이동할질문폼복사본.style.pointerEvents = "none";

      이동할질문폼복사본.style.border = "2px solid rgb(96 165 250)";
      이동할질문폼복사본.style.opacity = "0.95";
      이동할질문폼복사본.style.boxShadow = "0 30px 60px rgba(0, 0, 0, .2)";
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
        이동할질문폼복사본.style.left = `${이동할질문폼Pos.left + dX}px`;

        const 이동할질문폼복사본Pos =
          이동할질문폼복사본.getBoundingClientRect();

        currentDestinationItem = document
          .elementFromPoint(
            이동할질문폼복사본Pos.left + 이동할질문폼복사본Pos.width / 2,
            이동할질문폼복사본Pos.top + 이동할질문폼복사본Pos.height / 2
          )
          ?.closest<HTMLElement>(".draggable-item");
        currentDestinationIndex = Number(currentDestinationItem?.dataset.index);

        currentSourceItem = 이동할질문폼;
        currentSourceIndex = Number(currentSourceItem.dataset.index);

        if (currentDestinationItem?.isSameNode(currentSourceItem)) return;
      };

      const onMouseUpHandler = () => {
        document.body.removeAttribute("style");

        const 이동할질문폼Pos = 이동할질문폼.getBoundingClientRect();
        이동할질문폼복사본.style.left = `${이동할질문폼Pos.left}px`;
        이동할질문폼복사본.style.top = `${이동할질문폼Pos.top}px`;
        이동할질문폼복사본.style.opacity = "1";
        이동할질문폼복사본.style.transform = "none";
        이동할질문폼복사본.style.borderWidth = "0px";
        이동할질문폼복사본.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.15)";
        이동할질문폼복사본.style.transition = "all 200ms ease";

        이동할질문폼복사본.addEventListener(
          "transitionend",
          () => {
            이동할질문폼.removeAttribute("style");
            document.body.removeAttribute("style");
            이동할질문폼복사본.remove();

            if (currentDestinationItem) {
              순서바꾸기(currentSourceIndex, currentDestinationIndex);
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
    },
  };
}
