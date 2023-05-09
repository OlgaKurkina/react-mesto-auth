import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card, onClose);
  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__image-title">{card ? card.name : ""}</h2>
        <button className="close-icon" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
