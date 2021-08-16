
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CarouselPage from '../caruselPage/carouselPage';
import Projects from '../projects/projects';
import Abaut from '../abaut/abaut'
import Contact from '../contact/contact'
import Rating from '../rate/rate'
import SignUp from '../signUp/signUp'
import MailPhoneProjects from '../backgroundPicture/backgroundPicture'
import Sales from '../sales/sales'
import SignIn from '../signIn/signIn'
import React, { useState, useEffect } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import './nav.css';
import logo from '../../images/logo.jpg';
function NavbarPage() {
  const customerfromLocal = JSON.parse(localStorage.getItem('customer'))
  const [customer, setCustomer] = useState(customerfromLocal ? customerfromLocal : {
    name: "",
    token: ""
  });
  useEffect(() => {
    fetch("http://localhost:3080/LapinDesignerData/getUserName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        "Authorization": `Bearer ${customer.token}`
      },
      //body: JSON.stringify(res),
    }).then(res => res.json().then(data => ({ status: res.status, body: data })))
      .then(response => {
        if (response.status === 401) {
          debugger
          if (customer.name !== "") {
            setCustomer({
              name: "",
              token: ""
            })
            localStorage.setItem('customer', JSON.stringify(customer))
          }
        }
        else{
          setCustomer()
        }
      })
  }, [customer])

  //const [customerName, setCustomerName] = useState("");

  const [isOpen, setIsOpen] = useState(false)
  const toggleCollapse = () => {
    setIsOpen({ isOpen: !isOpen });
  }
  return (
    <Router>
      <MDBNavbar color="black" dark expand="md" className="justify-content-end">
        {customer.name !== "" ?
          <h3 className="customer-name">שלום {customer.name}</h3>
          : <></>
        }
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <> {!customer.name ? <MDBDropdownItem href="/signIn">כניסה לאזור האישי</MDBDropdownItem>
                    : <MDBDropdownItem href="/" onClick={() => { localStorage.removeItem('customer'); }}  >
                      יציאה מהאזור האישי</MDBDropdownItem>}</>
                  <MDBDropdownItem href="/signUp">הרשמה</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="phone">
                <MDBIcon icon="phone" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/mail">
                <MDBIcon far icon="envelope-open" />
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/contact">צור קשר</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/rate">לקוחות מספרים</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/sales">הטבות ומבצעים</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/projects">פרויקטים-גלריות</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/abaut">אודות</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active>
              <MDBNavLink to="">בית</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>

        </MDBCollapse>
        <Link to="/">
          <MDBNavbarBrand>
            <img src={logo} height="30" alt="" />
          </MDBNavbarBrand>
        </Link>
      </MDBNavbar>

      <Switch>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/rate">
          <Rating />
        </Route>
        <Route path="/abaut">
          <Abaut />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/sales">
          <Sales token={customer.token} />
        </Route>
        <Route path="/mail">
          <MailPhoneProjects info="mail" />
        </Route>
        <Route path="/phone">
          <MailPhoneProjects info="phone" />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/signIn">
          <SignIn setCustomer={setCustomer} />
        </Route>
        <Route path="">
          <CarouselPage />
        </Route>
      </Switch>
    </Router>
  );

}

export default NavbarPage;