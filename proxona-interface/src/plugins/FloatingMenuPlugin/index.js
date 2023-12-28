// src/FloatingMenuPlugin.tsx
import { useCallback, useEffect as useEffect2, useRef, useState as useState2 } from "react";
import { createPortal } from "react-dom";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL as NORMAL_PRIORITY,
  SELECTION_CHANGE_COMMAND as ON_SELECTION_CHANGE
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { computePosition } from "@floating-ui/dom";
import { jsx } from "react/jsx-runtime";
import { usePointerInteractions } from "./hooks/usePointerInteractions";

var DEFAULT_DOM_ELEMENT = document.body;
function FloatingMenuPlugin({
  element,
  MenuComponent,
  offset={x: 0, y: 0}
}) {
  const ref = useRef(null);
  const [coords, setCoords] = useState2(void 0);
  const show = coords !== void 0;
  const [editor] = useLexicalComposerContext();
  const { isPointerDown, isPointerReleased } = usePointerInteractions();

  const included = useCallback(() => {
    if (!editor || !editor.getRootElement) return -1
    return editor.getRootElement().contains(window.getSelection().anchorNode)
  }, [editor]) 
  const calculatePosition = useCallback(() => {
    const domSelection = getSelection();
    const domRange = domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);
    
    if (!domRange || !ref.current || isPointerDown)
      return setCoords(void 0);
    computePosition(domRange, ref.current, { placement: "right" }).then((pos) => {
      setCoords({ x: pos.x + (offset.x || 0), y: pos.y + (offset.y || 0) });
    }).catch(() => {
      setCoords(void 0);
    });
  }, [
    isPointerDown, isPointerReleased, 
  ]);
  const $handleSelectionChange = useCallback(() => {
    if (editor.isComposing())
      return false;
    if (editor.getRootElement() !== document.activeElement) {
      setCoords(void 0);
      return true;
    }
    const selection = $getSelection();
    if ($isRangeSelection(selection) && !selection.anchor.is(selection.focus)) {
      calculatePosition();
    } else {
      setCoords(void 0);
    }
    return true;
  }, [editor, calculatePosition, included]);
  useEffect2(() => {
    const unregisterCommand = editor.registerCommand(
      ON_SELECTION_CHANGE,
      $handleSelectionChange,
      NORMAL_PRIORITY
    );
    return unregisterCommand;
  }, [editor, $handleSelectionChange, included]);
  useEffect2(() => {
    if (!show && isPointerReleased) {
      editor.getEditorState().read(() => {
        $handleSelectionChange();
      });
    }
  }, [isPointerReleased, $handleSelectionChange, editor]);


  if (!MenuComponent)
    return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "aria-hidden": !show,
        style: {
          position: show ? "absolute" : 'fixed',
          top: coords?.y,
          left: coords?.x,
          visibility: show ? "visible" : "hidden",
          opacity: show ? 1 : 0,
        },
        children: /* @__PURE__ */ jsx(MenuComponent, { editor, shouldShow: show, show })
      }
    ),
    element ?? DEFAULT_DOM_ELEMENT
  );
}
export {
  FloatingMenuPlugin
};
