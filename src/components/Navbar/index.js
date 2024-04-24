import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";

const NavbarComp = () => {
  const { i18n } = useTranslation();

  const languageChange = () => {
    const otherLang = i18n.language === "en" ? "ar" : "en";

    i18n.changeLanguage(otherLang);
  };

  return (
    <Navbar
      className="navbar-main headroom bg-default navbar-dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <NavbarBrand className="mr-lg-5 display-4" to="/" tag={Link}>
          Games Assistant
        </NavbarBrand>

        <Nav>
          {/* <NavItem>
            <Link to="/rules">
              <NavLink className="text-white">{t("Game Rules")}</NavLink>
            </Link>
          </NavItem> */}

          <NavItem>
            <NavLink
              className="text-white"
              onClick={() => languageChange()}
              style={{ cursor: "pointer" }}
            >
              {i18n.language === "en" ? "ع" : "En"}
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
