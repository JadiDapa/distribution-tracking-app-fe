/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import { Requests } from "@/lib/types/request";
import { useState } from "react";
import { ArchiveRestore, Cable, Wrench } from "lucide-react";
import { CiInboxIn } from "react-icons/ci";
import { MaterialInventories } from "@/lib/types/material";
import { ToolInventories } from "@/lib/types/tool";
import { Vehicles } from "@/lib/types/vehicle";

type Props = {
  requests: Requests;
  requestInbox: Requests;
  materials: MaterialInventories;
  tools: ToolInventories;
  vehicles: Vehicles;
};

export default function Graph({
  requests,
  requestInbox,
  materials,
  tools,
  vehicles,
}: Props) {
  const [displayedData, setDisplayedData] = useState("requests");

  function getLast30Days() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      const day = pastDate.toISOString().split("T")[0]; // format as YYYY-MM-DD
      dates.push(day);
    }

    return dates.reverse(); // to get dates in ascending order
  }

  function aggregateDataByDate(data) {
    return data.reduce((acc, data) => {
      const date = data.createdAt.split("T")[0]; // get date part only
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: displayedData.toUpperCase(),
      },
    },
  };

  const labels = getLast30Days();
  let dataChart;
  if (displayedData === "requests") {
    dataChart = requests;
  } else if (displayedData === "request-inbox") {
    dataChart = requestInbox;
  } else if (displayedData === "materials") {
    dataChart = materials;
  } else if (displayedData === "tools") {
    dataChart = tools;
  } else if (displayedData === "vehicles") {
    dataChart = vehicles;
  }
  const datasByDate = aggregateDataByDate(dataChart);

  const filteredLabels = labels.filter((date) => datasByDate[date]);

  const dataSentData = filteredLabels.map((date) => datasByDate[date] || 0);

  const data = {
    labels: filteredLabels,
    datasets: [
      {
        label: displayedData.toUpperCase() + " Update",
        data: dataSentData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="box-shadow w-full rounded-md bg-white p-6 lg:w-[63%]">
      <div className="mb-2 text-center text-2xl font-medium text-primary">
        Select Charts
      </div>
      <div className="flex w-full flex-wrap justify-between gap-4 lg:justify-center lg:gap-6">
        <div
          onClick={() => setDisplayedData("materials")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "materials" ? "bg-[#5748ff] text-white" : "text-slate-700 hover:bg-[#5748ff] hover:text-white"}`}
        >
          <Cable size={18} strokeWidth={1.7} />
          Materials
        </div>
        <div
          onClick={() => setDisplayedData("tools")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "tools" ? "bg-[#47bcc0] text-white" : "text-slate-700 hover:bg-[#47bcc0] hover:text-white"}`}
        >
          <Wrench size={18} strokeWidth={1.7} />
          Tools
        </div>
        <div
          onClick={() => setDisplayedData("requests")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "requests" ? "bg-[#c750c7] text-white" : "text-slate-700 hover:bg-[#c750c7] hover:text-white"}`}
        >
          <ArchiveRestore size={18} strokeWidth={1.7} />
          Request Sent
        </div>
        <div
          onClick={() => setDisplayedData("request-inbox")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "request-inbox" ? "bg-yellow-500 text-white" : "text-slate-700 hover:bg-yellow-500 hover:text-white"}`}
        >
          <CiInboxIn size={18} strokeWidth={1.7} />
          Inbox
        </div>
      </div>
      <Line
        className="mt-6 scale-110 lg:scale-100"
        options={options}
        data={data}
      />
    </div>
  );
}
