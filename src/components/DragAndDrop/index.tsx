import { useState } from "react";
import { DroppableItem } from "./DroppableItem";
import { DraggableItem } from "./DraggableItem";

export function DragAndDrop() {
  return (
    <DroppableItem>
      <DraggableItem />
    </DroppableItem>
  );
}
