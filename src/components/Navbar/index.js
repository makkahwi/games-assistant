import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const { i18n } = useTranslation();

  const languageChange = () => {
    const otherLang = i18n.language === "en" ? "ar" : "en";

    i18n.changeLanguage(otherLang);
  };

  return (
    <nav className="navbar bg-primary fixed-top py-3">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Games Assistant
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link text-white"
              onClick={() => languageChange()}
              role="button"
            >
              {i18n.language === "en" ? "ع" : "En"}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComp;
