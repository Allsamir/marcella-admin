import { CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import { monthsLabel } from "src/utils/chartDataGenerator";

const ChartLine = ({ data, title, color }) => {
  return (
    <CChartLine
      className="mt-3 mx-3"
      style={{ height: "70px" }}
      data={{
        labels: monthsLabel,
        datasets: [
          {
            label: title,
            backgroundColor: "transparent",
            borderColor: "rgba(255,255,255,.55)",
            pointBackgroundColor: getStyle(`--cui-${color}`),
            data: data,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            min: 0,
            // max: 12,
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            borderWidth: 1,
            tension: 0.4,
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
          },
        },
      }}
    />
  );
};

export default ChartLine;
