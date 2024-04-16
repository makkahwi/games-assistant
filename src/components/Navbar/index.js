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
  const { t } = useTranslation();

  return (
    <Navbar
      className="navbar-main headroom bg-default navbar-dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <NavbarBrand className="mr-lg-5 display-4" to="/" tag={Link}>
          Password
        </NavbarBrand>

        <Nav>
          <NavItem>
            <Link to="/rules">
              <NavLink className="text-white">{t("Rules")}</NavLink>
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
