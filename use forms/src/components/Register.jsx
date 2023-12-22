import { useState } from "react";
import { useForm } from "react-hook-form";
import "../App.css";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (e) => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot be more than 20 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(submitHandler)}>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Registration Successful</div>
        ) : (
          <div></div>
        )}
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              {...register("firstName")}
              placeholder="First Name"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.firstName}</p>
          <div className="field">
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last Name"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.lastName}</p>
          <div className="field">
            <input
              type="text"
              {...register("email")}
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Register</button>
        </div>
      </form>
    </div>
  );
}