import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({
  deletedCard,
  isOpen,
  onClose,
  onDeleteCard,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard(deletedCard);
  }

  return (
    <PopupWithForm
      name="сonfirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
