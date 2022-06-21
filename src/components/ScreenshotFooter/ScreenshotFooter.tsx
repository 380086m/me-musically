import React, { useEffect, useState } from "react";
import "./ScreenshotFooter.sass";
import { getUser } from "../../api/utils";

function ScreenshotFooter() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUser().then(({ display_name }) => setUsername(display_name));
  }, []);

  return (
    <div className="screenshot-footer hide display-on-screenshot flex">
      <div className="username">{username}</div>
      <div>me-musically.com</div>
    </div>
  );
}

export default ScreenshotFooter;
