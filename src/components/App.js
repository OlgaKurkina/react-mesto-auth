import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import * as auth from "./auth.js";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState(null);

  const [loggedIn, setLoggedIn] = React.useState(false);
  //const [userData, setUserData] = React.useState({
  //  email: "",
  //  password: "",
  //});
  const navigate = useNavigate();

  // const [token, setToken] = React.useState("");

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      });
    }
  };
  React.useEffect(() => {
    tokenCheck();
  }, []);

  // React.useEffect(() => {
  //   auth.getUserInfo(token).then((user) => {
  //     setUserData(user);
  //     setIsLoggedIn(true);
  //     // navigate("/");
  //   });
  // }, [token]);

  //const registerUser = (formValue) => {
  //  auth
  //    .register(formValue.email, formValue.password)
  //    .then((res) => {
  //      localStorage.setItem("jwt", res.jwt);
  //      setToken(res.jwt);
  //      auth.getUserInfo(res.jwt).then((res) => {
  //        setUserData({
  //          email: res.email,
  //          password: res.password,
  //        });
  //      });
  //    })
  //    .catch((err) => console.log(err));
  //};

  //const loginUser = (formValue) => {
  //  if (!formValue.email || !formValue.password) {
  //    return;
  //  }
  //  auth
  //    .authorize(formValue.email, formValue.password)
  //    .then((res) => {
  //      localStorage.setItem("jwt", res.jwt);
  //      setToken(res.jwt);
  //      auth.getUserInfo(res.jwt).then((res) => {
  //        setUserData({
  //          email: res.email,
  //          password: res.password,
  //        });
  //      });
  //    })
  //  .then((data) => {
  //     if (data.jwt) {
  //      setUserData({ email: "", password: "" });
  //      handleLogin();
  //      navigate("/", { replace: true });
  //    }
  //  })
  //     .catch((err) => console.log(err));
  // };

  const handleLogin = (evt) => {
    evt.preventDefault();
    setLoggedIn(true);
  };

  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="content">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={
                    <Main
                      cards={cards}
                      onEditProfile={handleEditProfile}
                      onAddPlace={handleAddPlace}
                      onEditAvatar={handleAvatarUpdate}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleConfirmPopup}
                    />
                  }
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
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
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
