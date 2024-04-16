import { Link } from "react-router-dom";
import {
  Container,
  DropdownItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";

const NavbarComp = () => {
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
              <NavLink className="text-white">Rules</NavLink>
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
