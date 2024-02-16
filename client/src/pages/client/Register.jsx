import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { arrowBack } from "../../assets";
import { CustomAlert } from "../../components";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [roles, setRole] = useState("proposer");
  let [message, setMessage] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = () => {
    setBtnLoading(true);
    AuthService.register(username, email, password, roles)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); // Hide the custom alert after a delay
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleArrowBackClick = () => {
    navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="flex flex-row h-[1000px] bg-base-100">
      {showAlert && <CustomAlert message="註冊成功" type="sucess" />}
      <div className="flex flex-col items-center animate-fade-in-from-left-forwards opacity-0 -translate-x-16 relative">
        <div
          className="cursor-pointer absolute top-20 left-[31%]"
          onClick={handleArrowBackClick}
        >
          <img src={arrowBack} />
        </div>

        <div className="mt-40 ml-20 ">
          <div className="font-bold text-[3rem] mb-2">註冊</div>
          <div className="divider"></div>
          <div className="font-medium text-3xl">很高興認識您</div>
        </div>
      </div>

      <div
        style={{ padding: "3rem" }}
        className="flex justify-center col-md-12 w-[600px] container mx-auto rounded-[60px] bg-white shadow-md relative h-[620px]"
      >
        <div className="max-w-[400px] w-full">
          <div className="flex flex-col items-center">
            <div className="flex self-end mb-10">
              <button className="btn btn-ghost" onClick={handleLoginClick}>
                已有帳號？ 立即登入
              </button>
            </div>
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="form-control w-full max-w-xs ">
              <label className="label">
                <span className="label-text text-[1rem]">名稱：</span>
              </label>
              <input
                onChange={handleChangeUsername}
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="UserName"
                ref={inputRef}
              />
              <br />
              <label className="label">
                <span className="label-text text-[1rem]">信箱：</span>
              </label>
              <input
                onChange={handleChangeEmail}
                type="email"
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
            <div className="divider absolute left-0 right-0 bottom-28 mt-12"></div>
            <div className="flex self-end ">
              <button
                onClick={handleRegister}
                className={`w-[6rem] btn btn-primary mt-24 ${
                  btnLoading ? "loading" : ""
                }`}
              >
                <span>{btnLoading ? "" : "註冊"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
