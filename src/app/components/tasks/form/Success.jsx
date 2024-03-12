import Dialog from "@/components/shared/dialog";
import { useState } from "react";

export default function Success({ message, onClose }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} title="Transaction Successful" onClose={closeModal}>
      {message}
    </Dialog>
  );
}
