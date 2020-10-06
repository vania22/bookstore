import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getCategories, createProduct } from "../../api/api";
import ErrorLabel from "./ErrorLabel";

const CreateProductForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setCategoriesList = async () => {
      setCategories(await getCategories());
    };
    setCategoriesList();
  }, []);

  const initialValues = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "false",
    category: "",
    photo: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Please provide a name").max(32, "Name is too long"),
    description: Yup.string()
      .required("Please provide a description")
      .max(2000, "Description is too long"),
    price: Yup.number()
      .required("Price field is required")
      .max(1000000, "Please enter a valid price"),
    quantity: Yup.number().max(1000000, "Please enter a valid price"),
    category: Yup.string().required("Category is a mandatory field"),
  });

  const validatePhoto = (value) => {
    let error;

    if (!value) {
      return error;
    }

    if (value.size > 3000000) {
      error = "Image size must be less than 3mb";
    }

    if (
      !(value.type !== "image/jpeg" && value.type === "image/png") &&
      !(value.type !== "image/png" && value.type === "image/jpeg")
    ) {
      error = "Invalid image format, please use jpg, jpeg or png";
    }

    return error;
  };

  const onSubmit = (values, onSubmitProps) => {
    setIsLoading(true);
    createProduct(
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
      {success && (
        <div className="alert alert-info">{`Product "${name}" was successfully created`}</div>
      )}
      {error && (
        <div className="alert alert-danger">
          Error has occured, please check your form values and try again
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
              <label className="text-muted" htmlFor="description">
                Description
              </label>
              <Field
                as="textarea"
                type="text"
                id="description"
                name="description"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage name="description" component={ErrorLabel} />
            </div>
            <div className="form-group">
              <label className="text-muted" htmlFor="price">
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage name="price" component={ErrorLabel} />
            </div>
            <div className="form-group">
              <label className="text-muted" htmlFor="quantity">
                Quantity
              </label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                autoComplete="off"
              />
              <ErrorMessage name="quantity" component={ErrorLabel} />
            </div>

            <div className="form-group">
              <label className="text-muted" htmlFor="category">
                Category
              </label>
              <Field as="select" name="category" id="category" className="custom-select">
                {categories.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component={ErrorLabel} />
            </div>

            <div className="form-group form-check-inline">
              <label className="form-check-label text-muted">Shipping</label>
              <Field name="shipping">
                {({ field }) => (
                  <>
                    <input
                      {...field}
                      type="radio"
                      id="true"
                      value="true"
                      checked={field.value === "true"}
                      className="form-check-input ml-5"
                      style={{ transform: "scale(1.5)" }}
                    />
                    <label htmlFor="true" className="form-check-label">
                      Yes
                    </label>
                    <input
                      {...field}
                      type="radio"
                      id="false"
                      value="false"
                      checked={field.value === "false"}
                      className="form-check-input ml-5"
                      style={{ transform: "scale(1.5)" }}
                    />
                    <label htmlFor="false" className="form-check-label">
                      No
                    </label>
                  </>
                )}
              </Field>
              <ErrorMessage name="quantity" component={ErrorLabel} />
            </div>

            <div className="custom-file mb-4">
              <label className="custom-file-label" htmlFor="photo">
                {formik.values.photo.name}
              </label>
              <Field name="photo" validate={validatePhoto} validateOnChange={true}>
                {({ form }) => {
                  return (
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      className="custom-file-input"
                      onChange={(e) => {
                        form.setFieldValue("photo", e.target.files[0]);
                      }}
                    />
                  );
                }}
              </Field>
              {formik.errors.photo && formik.touched.photo ? (
                <ErrorLabel>{formik.errors.photo}</ErrorLabel>
              ) : null}
            </div>

            <div>
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
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateProductForm;
