// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// function SalesChart({ actualData = [], forecastData = [] }) {
//   // ================= MERGE DATA =================
//   const mergedData = [];

//   actualData.forEach((item) => {
//     mergedData.push({
//       date: item.date,
//       actual: item.actual,
//       predicted: null,
//     });
//   });

//   forecastData.forEach((item) => {
//     mergedData.push({
//       date: item.date,
//       actual: null,
//       predicted: item.predicted_sales,
//     });
//   });

//   if (!mergedData.length) {
//     return <p>No sales data available</p>;
//   }

//   return (
//     <div style={{ width: "100%", height: 320 }}>
//       <ResponsiveContainer>
//         <LineChart data={mergedData}>
//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis
//             dataKey="date"
//             tick={{ fontSize: 10 }}
//             allowDuplicatedCategory={false}
//           />

//           <YAxis />
//           <Tooltip />
//           <Legend />

//           {/* ACTUAL SALES */}
//           <Line
//             type="monotone"
//             dataKey="actual"
//             stroke="#2563eb"
//             strokeWidth={2}
//             dot={false}
//             name="Actual Sales"
//           />

//           {/* PREDICTED SALES */}
//           <Line
//             type="monotone"
//             dataKey="predicted"
//             stroke="#16a34a"
//             strokeWidth={2}
//             dot={false}
//             name="Predicted Sales"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default SalesChart;









import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const date = d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${date} (${day})`;
};


function SalesChart({ actualData = [], forecastData = [] }) {
  if (!actualData.length) return <p>Loading sales data...</p>;

  const mergedData = [
    ...actualData.map(d => ({
      date: d.date,
      actual: d.actual,
      predicted: null,
    })),
    ...forecastData.map(d => ({
      date: d.date,
      actual: null,
      predicted: d.predicted_sales,
    })),
  ];

  return (
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
          /> */}
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const d = new Date(value);
              return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
            }}
          />




          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            name="Actual Sales"
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            name="Predicted Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
