import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

import { isAuthenticated, signIn } from "../../api/api";
import ErrorLabel from "./ErrorLabel";

const SignInForm = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const { user } = isAuthenticated();

  const initialValues = {
    email: "krupskiy111@gmail.com",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Please provide an email").email("Please use valid email address"),
    password: Yup.string().required("Please provide a password"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);

    signIn(
      values,
      (response) => {
        window.localStorage.setItem("jwt", JSON.stringify(response.data));
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm({});
        setError(false);
        setIsLoading(false);
        setIsRedirect(true);
      },
      () => {
        onSubmitProps.setSubmitting(false);
        setIsLoading(false);
        setError(true);
      }
    );
  };

  const redirect = () => {
    if (!user) {
      return null;
    } else if (user.role === 1) {
      return <Redirect to="/admin/dashboard" />;
    } else if (user.role === 0) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <>
      {redirect()}
      {error && <div className="alert alert-danger">Incorrect email or password</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <label className="text-muted" htmlFor="email">
                Email
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage name="email" component={ErrorLabel} />
            </div>
            <div className="form-group">
              <label className="text-muted" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage name="password" component={ErrorLabel} />
            </div>
            {isLoading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Sign In!
              </button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
