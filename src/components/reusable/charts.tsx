import { ResponsiveLine } from "@nivo/line";
import { checkDateEquality } from "./Calender";
export function BarChart(props: {
  key: any;
  fields: any[];
  className: string;
}) {
  const fields = props.fields;
  //a function to get the total number of rosaries prayed each day
  //like total days submitted for 1st, 2nd, 3rd, etc
  const getTotalRosariesPrayed = (): Array<number> => {
    const totalDays = 30;
    let startDay = 1;
    let totalRosariesPerDay: Array<number> = [];
    while (startDay <= totalDays) {
      let totalRosaries = 0;
      const startDate = new Date(2024, 4, startDay);

      fields.forEach((field) => {
        field.daysSubmitted.forEach((thisDate: string) => {
          if (checkDateEquality(new Date(thisDate), startDate)) {
            totalRosaries += 1;
          }
        });
      });
      totalRosariesPerDay.push(totalRosaries);
      startDay++;
    }

    return totalRosariesPerDay;
  };
  const rosariesPerDay = getTotalRosariesPrayed();
  console.log(rosariesPerDay);
  const datas = rosariesPerDay.map((day, index) => {
    return { x: index + 1, y: day };
  });
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: datas,
          },
        ]}
        margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
        xScale={{
          type: "point",
        }}
        curve="linear"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",

          stacked: true,
          reverse: false,
        }}
        tooltip={({ point }) => {
          return (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                padding: "12px 16px",
                borderRadius: "20px",
              }}
            >
              <strong style={{ color: "#ffffff" }}>
                {point.data.yFormatted} Rosaries
              </strong>
              <br />
              <span style={{ color: "gray" }}>Day {point.data.xFormatted}</span>
            </div>
          );
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 6,
          tickValues: 6,
          legend: "Days",
          legendOffset: 36,
          legendPosition: "middle",
          tickRotation: -45,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickValues: 6,

          tickRotation: -27,
          legend: "Rosaries Prayed",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        colors={["#2563eb"]}
        pointSize={6}
        useMesh={true}
        gridYValues={28}
        enableGridY={false}
        enableGridX={false}
        pointColor={{ theme: "dots.text.fill" }}
        theme={{
          background: "rgba(0, 0, 0, 0.5)",

          text: {
            fontSize: 12,
            fill: "#ffffff",
          },
          dots: {
            text: {
              fill: "gray",
              fontSize: 12,
            },
          },
          axis: {
            ticks: {
              text: {
                fill: "#ffffff",
              },
            },
            legend: {
              text: {
                fill: "orange",
              },
            },
          },

          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "20px",
            },
          },
          crosshair: {
            line: {
              stroke: "#ffffff",
              strokeWidth: 1,
              strokeDasharray: "6",
            },
          },
          grid: {
            line: {
              stroke: "gray",
            },
          },
        }}
        role="application"
      />{" "}
    </div>
  );
}
