import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState("");

  const navigate = useNavigate();

  //регистрация
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          navigate("/signin", { replace: true });
          setIsConfirm(true);
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setIsConfirm(false);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  }

  //авторизация
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsConfirm(false);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  };

  //проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setIsUserEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, navigate]);

  //выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  }

  //добавление карточек
  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    api
      .addNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(card) {
    setDeletedCard(card);
    api
      .deleteMyCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //информация о пользователе
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(newData) {
    setIsLoading(true);
    api
      .updateUserData(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .updateUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAvatarUpdate() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmPopup(card) {
    setisConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setisConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="content">
          <Header email={isUserEmail} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfile}
                  onAddPlace={handleAddPlace}
                  onEditAvatar={handleAvatarUpdate}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmPopup}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} onLoading={isLoading} />}
            />
            <Route
              path="/signup"
              element={
                <Register onRegister={handleRegister} onLoading={isLoading} />
              }
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewCard={handleAddPlaceSubmit}
            onLoading={isLoading}
          />
          <ConfirmPopup
            deletedCard={deletedCard}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleDeleteCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isConfirm={isConfirm}
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
          />
          {loggedIn && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
