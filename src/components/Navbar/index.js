import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand } from "reactstrap";

const NavbarComp = () => {
  return (
    <Navbar
      className="navbar-main headroom bg-default navbar-dark py-4"
      expand="lg"
      sticky="top"
    >
      <Container>
        <NavbarBrand className="mr-lg-5 display-4" to="/" tag={Link}>
          Password
        </NavbarBrand>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
