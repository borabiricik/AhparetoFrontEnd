/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

const Footer = (props) => {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="http://www.edumatic.net" target="_blank">
              Edumatic
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="http://www.edumatic.net"
              target="_blank"
            >
              Hakkımızda
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="http://www.edumatic.net" target="_blank">
              Blog
            </a>
          </li>
        </ul>
        <div className="copyright">
          © {new Date().getFullYear()} - Edumatic Tüm Hakları Saklıdır.         
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
