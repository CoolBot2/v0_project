import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions";
import { userReducer } from "../../redux/reducers/userReducer";
import { Link, Navigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "../../assets/form.css";
import logoR from "../../assets/logoR.png";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };
  const dispatch = useDispatch();
  const { loading, usersList, errors, isSignedUp } = useSelector(
    (state) => state.userReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      age,
      userName,
      email,
      password,
      confirmPassword,
    };
    dispatch(registerUser(newUser));
  };
  return (
    <div className="signup">
      {isSignedUp ? (
        <Navigate to="/login" />
      ) : (
        <div className="form-container">
          <div className="img-container">
            <img src={logoR} className="logo" height="50px" alt="" />
          </div>
          <Form className="form" onSubmit={handleSubmit}>
            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.errors.find((el) => el.param === "firstName").msg}
          </h1> */}
            <div className="firstname">
              <Form.Field>
                <label>First name</label>
                <input
                  placeholder="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Field>
            </div>

            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.errors.find((el) => el.param === "lastName").msg}
          </h1> */}
            <div className="lastname">
              <Form.Field>
                <label>Last name</label>
                <input
                  placeholder="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Field>
            </div>
            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.errors.find((el) => el.param === "age").msg}
          </h1> */}
            <div className="age">
              <Form.Field>
                <label>Age</label>
                <input
                  placeholder="age"
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Field>
            </div>
            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.errors.find((el) => el.param === "userName").msg}
          </h1> */}
            <div className="username">
              <Form.Field>
                <label>Username</label>
                <input
                  placeholder="Username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Field>
            </div>
            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.errors.find((el) => el.param === "email").msg}
          </h1> */}
            <div className="email">
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Field>
            </div>
            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.errors.find((el) => el.param === "password").msg}
          </h1> */}
            <div className="password">
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Field>
            </div>
            {/* <h1>
            {errors.errors?.length > 0 &&
              errors.find((el) => el.param === "confirmPassword").msg}
          </h1> */}
            <div className="confirmpassword">
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  placeholder="confirm Password"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Field>
            </div>

            <div className="checkbox">
              <input type="checkbox" onClick={onCheckboxClick} />
              <label htmlFor="">I agree to the Terms and Conditions</label>
            </div>
            {!loading ? (
              <Button
                disabled={isDisabled}
                className="btn1"
                onSubmit={handleSubmit}
                type="submit"
                color="violet"
              >
                Create account
              </Button>
            ) : (
              <Button className="btn2" loading color="violet">
                Loading
              </Button>
            )}
            <div className="text1">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
            <div className="text2">
              <p>
                by selecting Create account, you agree and have read and
                acknowledge our <a href="">Terms And Conditions</a>
              </p>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
