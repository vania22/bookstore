import React from "react";
import Menu from "../components/Menu";

const Layout = ({
  title = "Welcome",
  description = "This is the best bookstore you have ever visited so far!",
  className,
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
