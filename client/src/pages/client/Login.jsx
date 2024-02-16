import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/auth.service";
import { arrowBack } from "../../assets";
import { CustomAlert } from "../../components";

const Login = (props) => {
  let { currentUser, setCurrentUser, setInCampaignPage } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    setInCampaignPage(false);
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  //focus

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    setBtnLoading(true);
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setShowAlert(true); // Show the custom alert

        setCurrentUser(AuthService.getCurrentUser());
        setTimeout(() => {
          setShowAlert(false); // Hide the custom alert after a delay
          navigate("/CampaignPage");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleArrowBackClick = () => {
    navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-row h-[1000px] bg-base-100">
      {showAlert && <CustomAlert message="登入成功" type="succes" />}
      <div className="flex flex-col items-center animate-fade-in-from-left-forwards opacity-0 -translate-x-16 relative">
        <div
          className="cursor-pointer absolute top-20 left-[31%]"
          onClick={handleArrowBackClick}
        >
          <img src={arrowBack} />
        </div>

        <div className="mt-40 ml-20 ">
          <div className="font-bold text-[3rem] mb-2">登入</div>
          <div className="divider"></div>
          <div className="font-medium text-3xl">歡迎回來</div>
        </div>
      </div>
      <div
        style={{ padding: "3rem" }}
        className="flex justify-center col-md-12 w-[600px] container mx-auto rounded-[60px] bg-white shadow-md relative h-[550px]"
      >
        <div className="max-w-[400px] w-full">
          <div className="flex flex-col items-center">
            <div className="flex self-end mb-10">
              <button className="btn btn-ghost" onClick={handleRegisterClick}>
                沒帳號？ 立即註冊
              </button>
            </div>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-[1rem]">信箱：</span>
              </label>
              <input
                onChange={handleChangeEmail}
                type="text"
                ref={inputRef}
                className="input input-bordered w-full max-w-xs"
                name="email"
              />
              <br />
              <label className="label">
                <span className="label-text text-[1rem]">密碼：</span>
              </label>
              <input
                onChange={handleChangePassword}
                type="password"
                className="input input-bordered w-full max-w-xs"
                name="password"
                onKeyDown={handleKeyPress}
              />
            </div>

            <br />
            <div className="divider absolute left-0 right-0 bottom-28 mt-12"></div>

            <div className="flex self-end">
              <button
                onClick={handleLogin}
                className={`w-[6rem] btn btn-primary mt-24 ${
                  btnLoading ? " loading" : ""
                }`}
              >
                <span>{btnLoading ? "" : "登入"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
