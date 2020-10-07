import React from "react";
import "../index.scss";

import Header from "../components/Header";

const Layout = ({
  title = "Welcome",
  description = "This is the best bookstore you have ever visited so far!",
  className,
  children,
  style,
}) => {
  return (
    <div>
      <Header />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
