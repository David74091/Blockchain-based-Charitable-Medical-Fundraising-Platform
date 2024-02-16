import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FundCard from "./FundCard";
import { donate } from "../assets";

// import { calculateBarPercentage, daysLeft } from "../utils";

const DisplayCases = (props) => {
  let { title, isLoading, caseData } = props;
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (cases) => {
    navigate(cases.title, { state: cases });
  };
  console.log("display:", caseData);

  if (caseData == null) {
    return <div>沒有資料</div>;
  }
  return (
    <div className="mt-10">
      <div className="flex animate-fade-in-from-left-forwards opacity-0 -translate-x-16 ml-0 justify-center">
        <Link
          to="/clientpostcase"
          className="card w-[300px] h-[300px] bg-primary shadow-xl p-5 flex items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/256/8686/8686042.png"
            alt="Shoes"
            className="object-cover w-[150px]"
          />

          <div className="card-body items-center text-center">
            <h1 className="card-title text-2xl">募集醫療資金</h1>
          </div>
        </Link>
      </div>

      <div className="divider mt-20"></div>
      <div className="container mx-auto">
        <p className="font-bold text-[2rem] mt-10 mb-10 opacity-0 transition-opacity duration-500 animate-fade-in-forwards text-center">
          熱門募資
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
          {caseData &&
            caseData.length > 0 &&
            caseData
              .map((cases) => (
                <FundCard
                  key={cases.id}
                  cases={cases} //等同於：<FundCard id={cases.id} title={cases.title} description={cases.description} />
                  handleClick={() => handleNavigate(cases)}
                />
              ))
              .reverse()}
        </div>
      </div>

      <br />
      <div className="w-full flex items-center justify-center mt-20 ">
        <div className="btn-group">
          <button className="btn btn-ghost bg-base-300  btn-active">1</button>
          <button className="btn btn-ghost bg-base-300">2</button>
          <button className="btn btn-ghost bg-base-300">3</button>
          <button className="btn btn-ghost bg-base-300">4</button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCases;
