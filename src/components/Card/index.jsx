import React, { useEffect, useState } from "react";
import { getCardData } from "./data";
import { Link } from "react-router-dom";
import axios from "axios";

const Card = () => {
  const [dashboardData, setDashboardData] = useState({});

  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/dashboard/"
      );
      console.log("dashboard response:", response?.data);
      setDashboardData(response.data || {});
    } catch (error) {
      console.error("error getting dashboard data", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {getCardData(dashboardData).map((ele) => {
        return (
          <div
            className={`${ele.bg_col}   border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700`}
          >
            <div className="flex p-6 items-center justify-between">
              <div className="">
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-white dark:text-white">
                  {ele.total_no}
                </h5>

                <p className="mb-3  text-white font-semibold dark:text-gray-400">
                  {ele.item_name}
                </p>
              </div>
              <div>{<ele.icon color="#ebecf050" size={96} opacity={20} />}</div>
            </div>
            <div className="w-full">
              <Link
                to={ele.link}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-500/20 w-full justify-center hover:bg-gray-500/40  "
              >
                <p className="">Browse</p>
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
