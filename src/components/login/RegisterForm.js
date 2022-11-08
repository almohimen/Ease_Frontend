import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerinput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({setVisible}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("first name is required")
      .min(3, "first name must be between 3 and 16 characters")
      .max(16, "first name must be between 3 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(3, "Last name must be between 3 and 16 characters.")
      .max(16, "Last name must be between 3 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}> ✘ </i>
          <span>Sign Up</span>
          <span>It's quick & easy.</span>
        </div>
        <br />
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError("it looks like you entered wrong information");
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError("it looks like you entered wrong information");
            } else if (gender === "") {
              setGenderError("please choose a gender");
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line_1 name_tag">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>

              {/* ----------------------------------------
              doctor/ patient status
--------------------------------------------- */}

              {/* <div className="reg_col">
                <div className="reg_line_header">
                  <span>You are?</span>
                  <div className="reg_grid">
                    <label htmlFor="doctor">
                    Doctor
                      <input
                        type="radio"
                        name="status"
                        id="doctor "
                        onChange={handleRegisterChange}
                      />
                    </label>
                    <label htmlFor="patient">
                    Patient
                      <input
                        type="radio"
                        name="status"
                        id="patient "
                        onChange={handleRegisterChange}
                      />
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="reg_infos">
                <span>
                  {" "}
                  By clicking Sign Up, you agree to our terms, Data policy and
                  Cookie policy you may receive SMS notification from us and you
                  can opt out any time
                </span>
              </div>
              <div className="reg_btn_wrapper">
                {/* <button className="btn">
                  <p className="btnText">Sign Up</p>
                  <div class="check-box">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path
                        fill="transparent"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </div>
                </button> */}
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              <PropagateLoader
                color="#313133"
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
