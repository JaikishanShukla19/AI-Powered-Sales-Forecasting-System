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


function ForecastTable({ data = [] }) {
  if (!data.length) {
    return <p>No forecast data available</p>;
  }

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }}>
      <h3 style={{ marginBottom: "12px" }}>Detailed Forecast</h3>

      <div style={{ maxHeight: "320px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={th}>Date</th>
              <th style={th}>Predicted Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{formatDate(row.date)}</td>
                <td style={td}>{row.predicted_sales.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left",
  fontWeight: "600",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

export default ForecastTable;
