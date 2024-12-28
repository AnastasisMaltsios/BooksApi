import React from "react";

function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer>
        <p>Anastasis Maltsios ⓒ {year}</p>
      </footer>
    );
  }

  export default Footer;