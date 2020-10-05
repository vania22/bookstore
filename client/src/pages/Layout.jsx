import React from "react";
import Header from "../components/Header";

const Layout = ({
  title = "Welcome",
  description = "This is the best bookstore you have ever visited so far!",
  className,
  children,
}) => {
  return (
    <div>
      <Header />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
