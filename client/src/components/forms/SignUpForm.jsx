import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signUp } from "../../api/api";
import ErrorLabel from "./ErrorLabel";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Please provide a name").max(32, "Name is too long"),
    email: Yup.string()
      .trim()
      .required("Please provide an email")
      .email("Please use valid email address"),
    password: Yup.string()
      .trim()
      .required("Please provide a password")
      .matches(
        "^(?=.*?[a-z])(?=.*?[0-9]).{6,}$",
        "Password must be at least 6 chars long and contain at least 1 number"
      ),
  });

  const onSubmit = (values, onSubmitProps) => {
    signUp(
      values,
      () => {
        onSubmitProps.resetForm({});
        setError(false);
        setSuccess(true);
      },
      () => {
        setError(true);
      }
    );
    onSubmitProps.setSubmitting(false);
  };

  return (
    <>
      {success && (
        <div className="alert alert-info">
          Your account has been created. Please
          <Link to="/signin" style={{ textDecoration: "underline" }}>
            sign in.
          </Link>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <label className="text-muted" htmlFor="name">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage name="name" component={ErrorLabel} />
            </div>
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
              {error && <ErrorLabel>Email address is in use</ErrorLabel>}
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
            <button
              className="btn btn-primary"
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Sign Up!
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
