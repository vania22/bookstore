import React from "react";

import Layout from "./Layout";
import SignInForm from "../components/forms/SignInForm";

const Signin = () => {
  return (
    <Layout
      title="Sign In"
      description="sign in to use the full power of our bookstore!"
      className="container col-md-4 offset-md-4"
    >
      <SignInForm />
    </Layout>
  );
};

export default Signin;
