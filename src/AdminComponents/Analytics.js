import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import "../adminLoader.css";
import Loader from "../Loader.json";

import Header from "./Header";
import ReactApexChart from "react-apexcharts";
import { ReactComponent as AdminArrow } from "../../src/images/AdminArrow.svg";

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyReports, setmonthlyReports] = useState([]);
  const [dashBoardDetails, setdashBoardDetails] = useState();
  const [chartData] = useState({
    series: [
      {
        name: "Reports",
        data: [12, 10, 20, 30, 25, 20, 15, 45, 20, 10, 20, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        dataLabels: {
          enabled: false,
        },
        bar: {
          borderRadius: 5,

          colors: {
            backgroundBarColors: ["#F0F0F0"],
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#4A3AFF",
              },
            ],
          },
          strokeWidth: 1,
          barWidth: 5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: 0,
        max: 60,
        tickAmount: 6,
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  const fecthDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/dashboardDetails",

        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setdashBoardDetails(response.data);
      // const monthlySubscriptionCounts = response.data.resultArray.map(
      //   (item) => item
      // );
      // // Set the result in your state variable.
      // setmonthlyReports(monthlySubscriptionCounts);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fecthDetails();
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, [fecthDetails]);

  return (
    <>
      <nav className="w-full bg-gray-800">
        <Header />
      </nav>

      {isLoading ? (
        <div className="lottie-containerd ">
          <Lottie animationData={Loader} />
        </div>
      ) : (
        <div className="ml-60">
          <div className="grid grid-cols-12 gap-2 p-3 ">
            <div className="font-inter col-span-12 border-b-2 p-1 text-lg font-semibold">
              Welcome back, Aziz
            </div>
            <div className="xs:col-span-12 rounded-lg bg-[#FFF] p-1 shadow-md xl:col-span-8">
              <div className="font-inter ml-5 text-xl font-semibold">
                Monthly Reports
              </div>
              <div id="chart">
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  // series={[
                  //   {
                  //     name: "Reports",
                  //     data: monthlyReports,
                  //   },
                  // ]}
                  type="bar"
                  height={300}
                />
              </div>
            </div>

            <div className="xs:col-span-12 grid grid-cols-12 justify-between gap-2 xl:col-span-4">
              <div className="xs:col-span-12 grid grid-cols-6 rounded-lg border bg-[#FFF] p-2 shadow-md lg:col-span-6 xl:col-span-12">
                <div className="col-span-6 flex h-[150px] flex-row justify-between">
                  <div>
                    <h1 className="font-inter mt-3 text-xl font-semibold">
                      Total Doctors
                    </h1>
                    <h2 className="mt-5 text-2xl font-bold">
                      {dashBoardDetails && dashBoardDetails.totalDoctors}
                    </h2>
                    <div className="flex flex-row text-xs font-bold text-green-400">
                      +21.01%
                      <div>
                        <AdminArrow
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <img
                    src={require("../../src/images/medical-team.png")}
                    alt=""
                  />
                </div>
              </div>

              <div className="xs:col-span-12 grid grid-cols-6 rounded-lg border bg-[#FFF] p-2 shadow-md lg:col-span-6 xl:col-span-12 ">
                <div className="col-span-6 flex h-[150px] flex-row justify-between">
                  <div>
                    <h1 className="font-inter mt-3 text-xl font-semibold">
                      Total Patients
                    </h1>
                    <h2 className="mt-5 text-2xl font-bold">
                      {dashBoardDetails && dashBoardDetails.totalPatients}
                    </h2>
                    <div className="flex flex-row text-xs font-bold text-green-400">
                      +11.08%
                      <div>
                        <AdminArrow
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <img
                    src={require("../../src/images/totalpatients.png")}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
