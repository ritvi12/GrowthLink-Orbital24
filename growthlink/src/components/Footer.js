import React from 'react';
import "./Footer.css";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div class="footer-col">
        <h4>
        <FaRegCopyright />  NUS Orbital Team Anari 2024
        </h4>
        <ul>
          <li><a href="#">one</a></li>
          <li><a href="#">two</a></li>
          <li><a href="#">three</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
