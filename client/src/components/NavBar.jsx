import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useStateContext } from "../context";
import CaseService from "../services/case.service";
import MessageService from "../services/message.service";
import { searchIcon, arrowDown, account } from "../assets";
import { CustomAlert } from "../components";

const NavBar = (props) => {
  const dropdownRef = useRef(null);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const [isReviewDropdownOpen, setIsReviewDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //按下enter查詢
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [userData, setUserData] = useState();

  let { setCaseData, setLoading, currentUser, setCurrentUser, inCampaignPage } =
    props;

  useEffect(() => {
    console.log("Using effect.");
    setLoading(true);
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    CaseService.getAllTrue()
      .then((data) => {
        console.log("NavBar Data", data.data);
        setCaseData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  useEffect(() => {
    console.log("Using effect.");
    setLoading(true);
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    // 獲取用戶數據
    AuthService.getUserData(_id)
      .then((data) => {
        console.log("User data", data.data);
        setUserData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderUserImage = () => {
    if (currentUser && userData) {
      return (
        <img
          src={userData.picture}
          className="h-10 w-10 rounded-full"
          alt="user-avatar"
        />
      );
    }
  };
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  const [selectedValue, setSelectedValue] = useState("提案類別");

  const handleSelectChange = (value) => {
    console.log("Select option changed to:", value);
    setSelectedValue(value);
    setIsCategoryDropdownOpen(false); // Close the dropdown menu
  };

  const [searchInput, setSearchInput] = useState("");
  const options = [
    "提案類別",
    "教育",
    "醫療",
    "環境",
    "兒少",
    "長者",
    "人本關懷",
    "動物保育",
    "翻轉人生",
    "藝術人文",
    "地方創生",
    "國際支援",
  ];
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleMangerClick = () => {
    setIsManageDropdownOpen(true);
  };
  const handleCategoryDropdownClick = (event) => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleSearch = async () => {
    setLoading(true);

    if (selectedValue === "提案類別" && searchInput === "") {
      CaseService.getAllTrue()
        .then((data) => {
          console.log("神喔都沒幹", data.data);
          setCaseData(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else if (selectedValue === "提案類別" && searchInput !== "") {
      // 情況2: 提案類別沒有選擇，但輸入數值有
      CaseService.getCaseByName(searchInput, "")
        .then((data) => {
          console.log("searchInput: ", searchInput);
          console.log("資料在此: ", data);
          setCaseData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else if (selectedValue !== "提案類別" && searchInput === "") {
      // 情況3: 提案類別有選擇，但輸入數值沒有
      CaseService.getCaseByName("", selectedValue)
        .then((data) => {
          console.log("資料在此: ", data);
          setCaseData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else if (selectedValue !== "提案類別" && searchInput !== "") {
      // 情況4: 提案類別有選擇，輸入數值也有
      CaseService.getCaseByName(searchInput, selectedValue)
        .then((data) => {
          console.log("searchInput: ", searchInput);
          console.log("資料在此: ", data);
          setCaseData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const { connect, address } = useStateContext();

  const navigate = useNavigate;
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/");
    }, [1500]);
  };

  return (
    <div className="flex justify-center bg-base-100 fixed top-0 left-0 right-0 z-10 mx-10">
      {showAlert && <CustomAlert message="登出成功" className="" />}
      <div class="navbar bg-base-200 h-[100px] max-w-[1800px] rounded-full mt-3 ">
        <div class="flex-grow">
          <Link
            to="/"
            class="btn btn-ghost normal-case text-xl text-[#291334] ml-2"
          >
            區塊鏈公益醫療募款平台
          </Link>
        </div>
        <div className="flex-grow justify-center">
          {inCampaignPage && (
            <div className="w-[600px] h-[3.5rem] bg-white rounded-full flex flex-row p-1 mr-4 mx-auto">
              <button className="btn btn-ghost " onClick={handleSearch}>
                <img src={searchIcon} />
              </button>
              <input
                type="text"
                value={searchInput}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="搜尋提案"
                className="input w-3/5 ml-1 bg-white"
                style={{ outline: "none" }}
              />

              <div className="flex-1"></div>
              <div
                ref={dropdownRef}
                className={`dropdown dropdown-end ${
                  isCategoryDropdownOpen ? "dropdown-open" : ""
                }`}
                tabIndex={0}
              >
                <button
                  className="btn btn-primary w-[120px] text-[#291334] focus:outline-none focus:ring-0"
                  style={{
                    backgroundColor: "#65C3C8", // 將按鈕背景設為透明
                    border: "none", // 移除按鈕邊框
                  }}
                  onClick={handleCategoryDropdownClick}
                >
                  {selectedValue}
                  <div className="">
                    <img src={arrowDown} />
                  </div>
                </button>

                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  {options.map((option) => (
                    <li
                      key={option}
                      className="menu-item"
                      onClick={(e) => {
                        e.stopPropagation(); // 防止事件被其他元素處理
                        handleSelectChange(option);
                        setIsCategoryDropdownOpen(false); // 關閉下拉選單
                      }}
                    >
                      <a
                        href="javascript:void(0)"
                        className="text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "admin" && (
                <li className="dropdown dropdown-end nav-item font-medium text-[rgba(112,121,139,1)]">
                  <label
                    tabIndex={0}
                    className="text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                  >
                    管理
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
                  >
                    <li>
                      <Link className="text-[#291334]" to="/AdminAllCase">
                        管理提案
                      </Link>
                    </li>
                    <li>
                      <Link to="/UserPage" className="text-[#291334]">
                        管理用戶
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "admin" && (
                <li className="dropdown dropdown-end nav-item font-medium text-[rgba(112,121,139,1)]">
                  <label
                    tabIndex={0}
                    className="text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                  >
                    審核
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
                  >
                    <li>
                      <Link className="text-[#291334]" to="/admincheckcase">
                        審核提案
                      </Link>
                    </li>
                    <li>
                      <Link className="text-[#291334]" to="/CashFlowDashBoard">
                        審核金流
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

            <div class="flex">
              {!currentUser && (
                <li className="nav-item font-medium text-[#291334]">
                  <Link
                    className="text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                    to="/login"
                  >
                    登入
                  </Link>
                </li>
              )}

              {currentUser && userData && (
                <div className="dropdown dropdown-end" onClick={handleClick}>
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xl">
                      {userData.picture ? (
                        <img src={userData.picture} alt="user avatar" />
                      ) : (
                        <img src={account} />
                      )}
                    </div>
                  </label>
                  {isOpen && (
                    <ul
                      tabIndex={0}
                      className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-[8rem]"
                    >
                      <li>
                        <Link
                          to="/profile"
                          className="text-[#291334] hover:text-[#291334] focus:text-[#291334] justify-between "
                        >
                          個人資料
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/organize"
                          className="text-[#291334] hover:text-[#291334] focus:text-[#291334] justify-between"
                        >
                          提案身份
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profilecases"
                          className="text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                        >
                          我的提案
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/DonationHistory"
                          className="text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                        >
                          捐款紀錄
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              )}

              {currentUser && (
                <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                  <Link
                    onClick={handleLogout}
                    className="nav-linkvtext-[#291334] hover:text-[#291334] focus:text-[#291334]"
                    to="/"
                  >
                    登出
                  </Link>
                </li>
              )}
            </div>

            {/* {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "proposer" &&
              address && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postcase">
                    發布提案
                  </Link>
                </li>
              )} */}
            {/* {currentUser && currentUser.user.role === "donor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/donate">
                  捐款
                </Link>
              </li>
            )} */}
            {currentUser &&
              currentUser.user.role &&
              currentUser.user.role == "admin" && (
                <li className="nav-item ml-[20px] font-medium text-[rgba(112,121,139,1)]">
                  <button
                    className="btn btn-outline btn-info text-[#291334] hover:text-[#291334] focus:text-[#291334]"
                    onClick={() => {
                      connect();
                    }}
                  >
                    {address ? "已連接錢包" : "連接錢包"}
                  </button>
                </li>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
