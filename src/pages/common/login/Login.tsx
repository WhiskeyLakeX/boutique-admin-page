import React, { useEffect, useState } from "react";
import "./index.scss";
import LoginBtn from "../../../module/component/Button/CustomLoginBtn/LoginBtn";
import { useMutation } from "react-query";
import { login, registerAdminAccount } from "../../../api/collection/Login_API";
import { USER_ADMIN } from "../../../api/KeyQuery";
import { GlobalInput } from "../../../module/component/InputField/GlobalAnt-InputField/GlobalInput";
import GlobalSelect from "../../../module/component/Select/GlobalSelect";
import GlobalDatepicker from "../../../module/component/Datepicker/GlobalDatepicker";
import { useDispatch } from "react-redux";
import UserAction from "../../../redux/actions/UserAction";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import { Button, Form, Input } from "antd";

import { requiredMessage } from "../../../module/utils/ValidationMesssage";

interface ILoginForm {
  username: string;
  password: string;
}

interface IRegisterForm extends ILoginForm {
  fullname: string;
  phone_number: string;
  email: string;
  gender?: number;
  dob?: string;
  address: string;
  role_id: 0;
}

function Login() {
  const [btnStatus, setBtnStatus] = useState("login");
  // const [loginFormData, setLoginFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    phone_number: "",
    email: "",
    gender: 0,
    dob: "",
    address: "",
    role_id: 0,
  });
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const onChangeRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({
      ...registerFormData,
      [e.currentTarget.id]: e.target.value,
    });
  };

  const loginMutation = useMutation(USER_ADMIN.LOGIN, login);
  const registerMutation = useMutation(
    USER_ADMIN.REGISTER,
    registerAdminAccount
  );

  const handleLogin = (loginFormData: ILoginForm) => {
    loginMutation.mutate(loginFormData, {
      onSuccess: (res: any) => {
        const dataUser = {
          accessToken: res?.data?.data?.accessToken,
          role: res?.data?.data?.userRole,
        };
        dispatch(
          UserAction.userLogin({
            ...dataUser,
            username: loginFormData.username,
          })
        );
        navigator("/dashboard");
      },
    });
  };
  useEffect(() => {
    // @ts-ignore
    const accessToken = store.getState().userReducer.accessToken;
    if (accessToken) {
      navigator("/dashboard");
    }
  }, [navigator]);
  const handleRegister = () => {
    registerMutation.mutate(registerFormData, {
      onSuccess: () => {
        setBtnStatus("login");
      },
    });
  };
  const formRender = () => {
    switch (btnStatus) {
      case "login":
        return (
          <div className="login-form form">
            <div className="t-h4 t-bold form-title">Đăng nhập</div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              autoComplete="off"
              layout={"vertical"}
              style={{ minWidth: "90%" }}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: requiredMessage("tên đăng nhập") },
                ]}
                style={{
                  marginBottom: "12px",
                }}
              >
                <Input size={"large"} />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: requiredMessage("mật khẩu") },
                ]}
              >
                <Input.Password size={"large"} />
              </Form.Item>

              {/*<Form.Item name="remember" valuePropName="checked">*/}
              {/*  <Checkbox>Remember me</Checkbox>*/}
              {/*</Form.Item>*/}

              <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
                style={{
                  marginTop: 15,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size={"large"}
                  className={"login-btn"}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      case "register":
        return (
          <div className="registration-form form">
            <div className="t-h4 t-bold form-title">Đăng ký</div>
            {/*username*/}
            <label htmlFor="username" className={"registration-form-label"}>
              Tên tài khoản
            </label>
            <GlobalInput
              id="username"
              placeholder={"Tên đăng nhập"}
              onChange={(e) => {
                onChangeRegisterForm(e);
              }}
              size={"large"}
            />
            {/*password*/}
            <label htmlFor="password" className={"registration-form-label"}>
              Mật khẩu
            </label>
            <GlobalInput
              placeholder={"Mật khẩu"}
              type={"password"}
              id="password"
              onChange={(e) => {
                onChangeRegisterForm(e);
              }}
              size={"large"}
            />
            {/*fullname*/}
            <label htmlFor="fullname" className={"registration-form-label"}>
              Họ và tên
            </label>
            <GlobalInput
              id="fullname"
              placeholder={"Họ và tên"}
              onChange={(e) => {
                onChangeRegisterForm(e);
              }}
              size={"large"}
            />
            {/*dob*/}
            <div className={"d-flex-vertical"}>
              <label htmlFor="dob" className={"registration-form-label"}>
                Ngày sinh
              </label>
              <GlobalDatepicker
                placeholder={"Ngày sinh"}
                id="dob"
                onChange={(date: Date, dateString: string) => {
                  console.log(dateString);
                  setRegisterFormData({
                    ...registerFormData,
                    dob: dateString,
                  });
                }}
                style={{
                  width: "130px",
                }}
                size={"large"}
              />
            </div>

            {/*phone*/}
            <label htmlFor="phone_number" className={"registration-form-label"}>
              Số điện thoại
            </label>
            <GlobalInput
              id="phone_number"
              onChange={(e) => {
                onChangeRegisterForm(e);
              }}
              size={"large"}
              placeholder={"Số điện thoại"}
            />
            {/*address*/}
            <label htmlFor="address" className={"registration-form-label"}>
              Địa chỉ
            </label>
            <GlobalInput
              id="address"
              onChange={(e) => {
                onChangeRegisterForm(e);
              }}
              size={"large"}
              placeholder={"Địa chỉ"}
            />
            {/*email*/}
            <label htmlFor="email" className={"registration-form-label"}>
              Email
            </label>
            <GlobalInput
              id="email"
              onChange={(e) => {
                onChangeRegisterForm(e);
              }}
              placeholder={"Email"}
              size={"large"}
            />
            {/*gender*/}
            <div className={"d-flex-vertical"}>
              <label htmlFor="gender" className={"registration-form-label"}>
                Giới tính
              </label>
              <GlobalSelect
                defaultValue={0}
                id="gender"
                size={"large"}
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
                onChange={(value: string) => {
                  setRegisterFormData({
                    ...registerFormData,
                    gender: parseInt(value, 10),
                  });
                }}
              />
            </div>
            <div role={"button"} onClick={handleRegister}>
              <LoginBtn
                label="Đăng ký"
                labelClass="t-h5 t-normal"
                labelTextColor="black"
                borderRadius="5px"
                margin="20px 0px 20px 0px"
                padding="5px 20px 5px 20px"
              />
            </div>
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
