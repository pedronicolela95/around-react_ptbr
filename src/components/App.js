import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const apiToken = "30daf07f-92e8-4bf2-9f92-48f8d54dd26d";
const groupId = "web_ptbr_cohort_03";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/" + groupId,
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setImagePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard("");
  }

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
        return api.getInitialCards().then((res) => {
          setCards(res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(profileInfo) {
    api
      .updateProfileInfo(profileInfo)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(profileInfo) {
    api
      .updateProfileImage(profileInfo)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Verifique mais uma vez se esse cartão já foi curtido
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Envie uma solicitação para a API e obtenha os dados do cartão atualizados
    api.likeCard(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleDeleteCard(card) {
    // Envie uma solicitação para a API e obtenha os dados do cartão atualizados
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleAddNewCard(card) {
    // Envie uma solicitação para a API e obtenha os dados do cartão atualizados
    api
      .postCards(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          handleEditAvatarClick={handleEditAvatarClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          closeAllPopups={closeAllPopups}
          isImagePopupOpen={isImagePopupOpen}
          handleCardClick={handleCardClick}
          selectedCard={selectedCard}
          handleUpdateUser={handleUpdateUser}
          handleUpdateAvatar={handleUpdateAvatar}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          handleAddNewCard={handleAddNewCard}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
