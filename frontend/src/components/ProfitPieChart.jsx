// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#22c55e", "#ef4444", "#facc15"];

// function ProfitPieChart({ metrics }) {
//   if (!metrics || !metrics.total_sales) {
//     return <p>No profit data available</p>;
//   }

//   /* ===== SAFE BUSINESS ASSUMPTION =====
//      Profit = 30% of sales
//      Cost   = 50% of sales
//      Other  = 20% of sales
//      (You can later replace with real backend values)
//   */
//   const total = metrics.total_sales;

//   const data = [
//     { name: "Profit", value: total * 0.3 },
//     { name: "Cost", value: total * 0.5 },
//     { name: "Other", value: total * 0.2 },
//   ];

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={50}
//             outerRadius={90}
//             label
//           >
//             {data.map((_, index) => (
//               <Cell key={index} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default ProfitPieChart;









import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#facc15"];

function ProfitPieChart({ metrics }) {
  if (!metrics) return null;

  const data = [
    { name: "Profit", value: metrics.total_profit },
    { name: "Cost", value: metrics.total_cost },
    { name: "Other", value: metrics.other_cost },
  ];

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitPieChart;
