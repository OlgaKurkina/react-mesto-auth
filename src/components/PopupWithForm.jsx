import React from "react";
import usePopupClose from "../hooks/usePopupClose";
function PopupWithForm({
  name,
  isOpen,
  title,
  buttonText,
  onClose,
  children,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className={`popup__container-name popup__${name}`}>{title}</h2>
        <form
          className="popup__form"
          name={`${name}-form`}
          method="post"
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__button"
            type="submit"
            name="submit"
            id="submit"
          >
            {buttonText}
          </button>
        </form>
        <button className="close-icon" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
