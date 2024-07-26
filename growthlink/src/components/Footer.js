import React from 'react';
import "./Footer.css";
import { FaRegCopyright} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div data-testid="footer" className="footer-col">
        <h4>
        <FaRegCopyright />  NUS Orbital Team Anari 2024
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
