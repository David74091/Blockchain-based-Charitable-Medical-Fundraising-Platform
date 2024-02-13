import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DisplayCases, PageLoading } from "../../components";

const Home = (props) => {
  let { setInCampaignPage } = props;

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setInCampaignPage(false);
    const fadeInElement = document.querySelector(".transition-opacity");
    setTimeout(() => {
      fadeInElement.classList.add("opacity-100");
    }, 500); // 从 100 改为 500
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center h-1280px w-full mt-40 gap-20">
          <Link
            to="CampaignPage"
            className="bg-accent card w-96 h-96 bg-base-100 shadow-xl p-10"
          >
            <div className="w-full h-full flex flex-col justify-center items-center	">
              <figure>
                <img
                  className="object-cover h-full"
                  src="https://cdn-icons-png.flaticon.com/256/8662/8662585.png"
                />
              </figure>
              <div className="card-body">
                <h2>瀏覽所有募款</h2>
              </div>
            </div>
          </Link>
          <Link
            to="Register"
            className="bg-secondary card w-96 h-96 bg-base-100 shadow-xl p-10"
          >
            <div className="w-full h-full flex flex-col justify-center items-center	">
              <figure>
                <img
                  className="object-cover h-full"
                  src="https://cdn-icons-png.flaticon.com/256/8662/8662284.png"
                />
              </figure>
              <div className="card-body">
                <h2>立即註冊</h2>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={`divider mt-80 ${
            isScrolled
              ? "animate-fade-in-from-left"
              : "opacity-0 -translate-x-16"
          }`}
        ></div>
        <div className="mt-20">
          <div
            className={`ml-24 ${
              isScrolled
                ? "animate-fade-in-from-left"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <p className="font-light text-[1rem]">怎麼運作？</p>
          </div>
          <div
            className={`ml-24 mt-4 ${
              isScrolled
                ? "animate-fade-in-from-left"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <p className="text-3xl font-bold">在平台上捐款</p>
            <br />
            <p className="text-3xl font-bold">迅速驗證至區塊鏈</p>
          </div>
          <ul
            className={`steps w-[600px] mt-16 ${
              isScrolled
                ? "animate-fade-in-from-left"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <li className="step step-secondary">
              <p className="text-xl font-bold ">捐款</p>
              <p className="font-light mt-2">多元捐款方式</p>
            </li>
            <li className="step step-secondary">
              <p className="text-xl font-bold ">驗證</p>
              <p className="font-light mt-2">捐款驗證至區塊鏈</p>
            </li>
            <li className="step step-secondary">
              <p className="text-xl font-bold ">查看</p>
              <p className="font-light mt-2">監督區塊鏈金流</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Home;
