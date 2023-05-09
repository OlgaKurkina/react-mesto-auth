import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddNewCard,
  onLoading,
}) {
  const newPlace = useRef();
  const newLink = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddNewCard({
      name: newPlace.current.value,
      link: newLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText={onLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_theme_light popup__input_type_element-name"
        type="text"
        name="element-name"
        id="element-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={newPlace}
      />
      <span className="popup__input-error element-name-error"></span>
      <input
        className="popup__input popup__input_theme_light popup__input_type_element-link"
        type="url"
        name="element-link"
        id="element-link"
        placeholder="Ссылка на картинку"
        required
        ref={newLink}
      />
      <span className="popup__input-error element-link-error"></span>
    </PopupWithForm>
  );
}
