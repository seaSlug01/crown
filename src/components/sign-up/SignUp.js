import React, { useState } from "react";

import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

function SignUp() {
  const [signUpDetails, setSignUpDetails] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = signUpDetails;

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      console.log(displayName);

      await createUserProfileDocument(user, { displayName });

      setSignUpDetails({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setSignUpDetails({ ...signUpDetails, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account.</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          autoComplete="off"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
        />

        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
}

export default SignUp;
