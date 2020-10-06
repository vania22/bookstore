import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createCategory } from "../../api/categories";
import ErrorLabel from "./ErrorLabel";

const CreateCategoryForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Please provide a name").max(32, "Name is too long"),
  });

  const onSubmit = (values, onSubmitProps) => {
    setIsLoading(true);
    createCategory(
      values,
      () => {
        onSubmitProps.resetForm({});
        setError(false);
        setName(values.name);
        setSuccess(true);
        setTimeout(() => setSuccess(null), 5000);
      },
      () => {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    );
    onSubmitProps.setSubmitting(false);
    setIsLoading(false);
  };

  return (
    <>
      {success && <div className="alert alert-info">{`${name} was successfully created`}</div>}
      {error && <div className="alert alert-danger">Category with this name already exists</div>}
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
            {isLoading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Create
              </button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateCategoryForm;
