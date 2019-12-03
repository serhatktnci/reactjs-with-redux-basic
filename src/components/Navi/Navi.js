import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export default class Navi extends React.Component {

  render() {
    return (
      <div>
        
                  <Link data-testid="Navi" to="/addItem">Ürün ekle</Link>
            
      </div>
    );
  }
}
