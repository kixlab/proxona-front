// src/hooks/usePointerInteractions.tsx
import { useEffect, useState } from "react";
function usePointerInteractions() {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPointerReleased, setIsPointerReleased] = useState(true);
  useEffect(() => {
    const handlePointerUp = () => {
      setIsPointerDown(false);
      setIsPointerReleased(true);
      document.removeEventListener("pointerup", handlePointerUp);
    };
    const handlePointerDown = () => {
      setIsPointerDown(true);
      setIsPointerReleased(false);
      document.addEventListener("pointerup", handlePointerUp);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);
  return { isPointerDown, isPointerReleased };
}

export {
    usePointerInteractions
}