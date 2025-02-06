import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";

interface ISeries {
  name: string;
  data: number[];
  dates: Date[];
}

const Reports = () => {
  const [series, setSeries] = useState<ISeries[]>([
    {
      name: "Time spent learning per day",
      data: [],
      dates: [],
    },
  ]);

  useEffect(() => {
    const fetchTimeSpent = async () => {
      try {
        const response = await axiosConfig.get("/progress/per-day");
        setSeries(response.data.details.data.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          console.log(err.response?.data);
        }
      }
    };

    fetchTimeSpent();
  }, []);

  return (
    <>
      <Layout>
        <div className="p-2 flex w-full">
          <div className="sm:w-1/2">
            <VictoryChart
              scale={{ x: "time" }}
              domainPadding={{ x: 20 }}
              theme={VictoryTheme.clean}
            >
              <VictoryLabel
                text={series[0].name}
                dx={28}
                dy={18}
                style={{
                  ...VictoryTheme.clean.label,
                }}
              />
              <VictoryAxis
                tickFormat={(date) => new Date(date).toLocaleDateString()}
                style={{
                  axisLabel: { padding: 40 },
                  ticks: { stroke: "black", size: 5 },
                  tickLabels: { fontSize: 10, angle: -45 },
                }}
                label={"Date"}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axisLabel: {
                    padding: 40,
                  },
                  ticks: { stroke: "black", size: 5 },
                  tickLabels: { fontSize: 10 },
                }}
                label={"Hours"}
              />
              <VictoryLine
                data={series[0].data.map((value, index) => ({
                  x: new Date(series[0].dates[index]),
                  y: value / 60,
                }))}
              />
              <VictoryScatter
                data={series[0].data.map((value, index) => ({
                  x: new Date(series[0].dates[index]),
                  y: value / 60,
                }))}
                labels={({ datum }) =>
                  `${datum.y.toFixed(2)} hours\n${new Date(
                    datum.x
                  ).toLocaleDateString()}`
                }
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 10 }}
                    flyoutStyle={{
                      stroke: "#757575",
                      fill: "white",
                    }}
                  />
                }
              />
            </VictoryChart>
          </div>
          <div></div>
        </div>
      </Layout>
    </>
  );
};

export default Reports;
