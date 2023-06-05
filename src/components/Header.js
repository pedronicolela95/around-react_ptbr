import headerImageImg from "../images/header/header__image.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__image"
        alt="Around USA logo"
        src={headerImageImg}
      />
    </header>
  );
}

export default Header;
