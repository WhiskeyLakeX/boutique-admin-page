import React, { useState } from "react";
import "./index.scss";
import InputField from "../../../module/component/InputField/CustomInputField/InputField";
import LoginBtn from "../../../module/component/Button/CustomLoginBtn/LoginBtn";
import { useMutation } from "react-query";
import { login } from "../../../api/collection/Login_API";
import { QUERY_KEY_USER } from "../../../api/KeyQuery";
import { GlobalInput } from "../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalSelect from "../../../module/component/Select/GlobalSelect";
import GlobalDatepicker from "../../../module/component/Datepicker/GlobalDatepicker";

function Login() {
  const [btnStatus, setBtnStatus] = useState("login");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    phone_number: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    role_id: 0,
  });
  const loginMutation = useMutation(QUERY_KEY_USER.LOGIN, login);
  const formRender = () => {
    switch (btnStatus) {
      case "login":
        return (
          <div className="login-form form">
            <div className="t-h3 t-bold form-title">Login</div>
            <InputField
              placeholder={"Username"}
              title={"Username"}
              titleDirection={"vertical"}
              onInputChange={(value: string) => {
                setLoginFormData({
                  ...loginFormData,
                  password: value,
                });
                console.log(loginFormData);
              }}
            />
            <InputField
              placeholder={"Password"}
              type="password"
              title={"Password"}
              titleDirection={"vertical"}
              onInputChange={(value: string) => {
                setLoginFormData({
                  ...loginFormData,
                  username: value,
                });
              }}
            />
            <div
              role={"button"}
              onClick={() => {
                loginMutation.mutate(loginFormData, {
                  onSuccess: (res: any) => {
                    const dataUser = {
                      accessToken: res.response.accessToken,
                    };
                  },
                });
              }}
            >
              <LoginBtn
                label="Đăng nhập"
                labelClass="t-h5 t-normal"
                labelTextColor="black"
                borderRadius="5px"
                margin="20px 0px 0px 0px"
                padding="5px 20px 5px 20px"
              />
            </div>
          </div>
        );
      case "register":
        return (
          <div className="registration-form form">
            <div className="t-h3 t-bold form-title">Register</div>
            {/*username*/}
            <label htmlFor="username" className={"registration-form-label"}>
              Tên tài khoản
            </label>
            <GlobalInput id="username" />
            {/*password*/}
            <label htmlFor="password" className={"registration-form-label"}>
              Mật khẩu
            </label>
            <GlobalInput id="password" />
            {/*fullname*/}
            <label htmlFor="fullname" className={"registration-form-label"}>
              Họ và tên
            </label>
            <GlobalInput id="fullname" />
            {/*dob*/}
            <div className={"d-flex-vertical"}>
              <label htmlFor="dob" className={"registration-form-label"}>
                Ngày sinh
              </label>
              <GlobalDatepicker
                id="dob"
                style={{
                  width: "130px",
                }}
              />
            </div>

            {/*phone*/}
            <label htmlFor="phone" className={"registration-form-label"}>
              Số điện thoại
            </label>
            <GlobalInput id="phone" />
            {/*address*/}
            <label htmlFor="address" className={"registration-form-label"}>
              Địa chỉ
            </label>
            <GlobalInput id="address" />
            {/*email*/}
            <label htmlFor="email" className={"registration-form-label"}>
              Email
            </label>
            <GlobalInput id="email" />
            {/*gender*/}
            <div className={"d-flex-vertical"}>
              <label htmlFor="gender" className={"registration-form-label"}>
                Giới tính
              </label>
              <GlobalSelect
                id="gender"
                options={[
                  { value: 0, label: "Nam" },
                  {
                    value: 1,
                    label: "Nữ",
                  },
                ]}
                style={{
                  width: "100px",
                }}
              />
            </div>
            <LoginBtn
              label="Đăng ký"
              labelClass="t-h5 t-normal"
              labelTextColor="black"
              borderRadius="5px"
              margin="20px 0px 0px 0px"
              padding="5px 20px 5px 20px"
            />
          </div>
        );
    }
  };

  const switchSection = (event: React.MouseEvent) => {
    if (event.currentTarget.id === "login" && btnStatus === "register") {
      setBtnStatus("login");
    } else if (event.currentTarget.id === "register" && btnStatus === "login") {
      setBtnStatus("register");
    }
  };

  return (
    <div className="wrapper">
      <div className="common-login-page">
        <div></div>
        <div className="container">
          <div className="login-section-btn">
            <div
              className={`login-btn sw-btn ${
                btnStatus === "login" ? "selected-btn" : ""
              }`}
              onClick={(event) => switchSection(event)}
              id="login"
            >
              Đăng nhập
            </div>
            <div
              className={`regis-btn sw-btn ${
                btnStatus === "register" ? "selected-btn" : ""
              }`}
              onClick={(event) => switchSection(event)}
              id="register"
            >
              Đăng ký
            </div>
          </div>
          <div className="form-container">{formRender()}</div>
          <div className="float-btn">?</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
