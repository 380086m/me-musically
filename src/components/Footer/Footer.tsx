import React from "react";
import githubLogo from "../../assets/github.png";
import madeWithReact from "../../assets/made-with-react.png";
import "./Footer.sass";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <a href="https://github.com/380086m/me-musically">
            <img
              src={madeWithReact}
              style={{ width: "100px", marginRight: "10px" }}
              alt="Repository"
            />
            <img src={githubLogo} style={{ width: "35px" }} alt="Github" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
