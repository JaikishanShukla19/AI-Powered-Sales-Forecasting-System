import { useEffect, useState, useCallback } from "react";
import SalesChart from "../components/SalesChart";
import ProfitPieChart from "../components/ProfitPieChart";
import ForecastTable from "../components/ForecastTable";

function Dashboard() {
  /* ================= STATE ================= */
  const [metrics, setMetrics] = useState(null);
  const [actualSales, setActualSales] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [days, setDays] = useState(30);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  /* ================= FETCH METRICS ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard-metrics")
      .then((res) => res.json())
      .then(setMetrics)
      .catch(console.error);
  }, []);

  /* ================= FETCH ACTUAL SALES ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:5000/actual-sales")
      .then((res) => res.json())
      .then(setActualSales)
      .catch(console.error);
  }, []);

  /* ================= FETCH PREDICTIONS ================= */
  const fetchPrediction = useCallback(() => {
    setLoadingPrediction(true);

    fetch(`http://127.0.0.1:5000/forecast?days=${days}`)
      .then((res) => res.json())
      .then((data) => {
        setPredictions(data.forecast || []);
        setLoadingPrediction(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPrediction(false);
      });
  }, [days]);

  /* ================= AUTO LOAD 30 DAYS ================= */
  useEffect(() => {
    fetchPrediction();
  }, [fetchPrediction]);

  if (!metrics) {
    return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.headerCenter}>
        <h1 style={styles.headerTitle}>
          📊 AI Powered Sales Forecast Dashboard
        </h1>
        <p style={styles.headerSubtitle}>
          Future sales prediction using historical data & ML
        </p>
      </div>



      {/* PRODUCT INFO */}
    <div style={styles.infoCard}>
      <h3>Product Name: NITRO V15</h3>
        <h3>
          Forecast generated using historical sales data and predictive modeling.
        </h3>
    </div>
        

      {/* KPIs */}
      <h1 style={{ marginTop: "29px", marginBottom: "1px" }}>
        Dashboard Overview
      </h1>

      <div style={styles.grid}>
        <Card title="Total Sales" value={metrics.total_sales.toFixed(2)} />
        <Card title="Avg Daily Sales" value={metrics.average_daily_sales.toFixed(2)} />
        <Card title="Last Actual Sale" value={metrics.last_actual_sales.toFixed(2)} />
        <Card
          title="Next Predicted Sale"
          value={
            predictions.length > 0
              ? predictions[0].predicted_sales.toFixed(2)
              : "N/A"
          }
        />
      </div>

      {/* CONTROLS */}
      <div style={styles.controlBox}>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={30}>Next 30 Days</option>
          <option value={60}>Next 60 Days</option>
          <option value={90}>Next 90 Days</option>
        </select>

        <button onClick={fetchPrediction}>
          {loadingPrediction ? "Generating..." : "Generate Forecast"}
        </button>
      </div>

      <div style={styles.chartRow}>
        {/* TREND CHART */}
        <div style={styles.chartLarge}>
          <h3 style={styles.chartTitle}>
            Sales Trend (Historical + Prediction)
          </h3>
          <SalesChart
            actualData={actualSales}
            forecastData={predictions}
          />
        </div>

        {/* PIE CHART */}
        <div style={styles.chartSmall}>
          <h3 style={styles.chartTitle}>
            Profit / Cost Distribution
          </h3>
          <ProfitPieChart metrics={metrics} />
        </div>
      </div>
      <div style={styles.tableWrapper}>
        <h3 style={styles.chartTitle}>Detailed Forecast</h3>
        <ForecastTable data={predictions} />
      </div>
    </div>
  );
  
}


/* ================= CARD ================= */
function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardValue}>{value}</div>
    </div>
  );
}


/* ================= STYLES ================= */
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px",
    marginTop: "20px",
  },


  card: {
    background: "#f4f6f8",
    padding: "1px", // ⬅️ smaller padding
    borderRadius: "12px",
  },
  
  cardTitle: {
    fontSize: "13px",   // ✅ readable
    fontWeight: "600",
    color: "#111111ff",
  },

  cardValue: {
    fontSize: "22px",   // ✅ big KPI numbers
    fontWeight: "700",
    marginTop: "4px",
    color: "#111",
  },

  infoCard: {
    background: "#ddd1d1ff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "16px",
    fontSize: "14px",
    lineHeight: "1.2",
  },

  tag: {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 14px",
    background: "#e0f2ff",
    color: "#0369a1",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "500",
  },

  chartCard: {
    background: "#d1babaff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "30px",
  },
  chartWide: {
    background: "#ffffffff",
    padding: "24px",
    borderRadius: "14px",
    minHeight: "420px",
  },

  chartNarrow: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    minHeight: "420px",
  },

  controlBox: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  chartRow: {
    display: "grid",
    gridTemplateColumns: "2.3fr 1fr",
    gap: "28px",
    marginTop: "32px",
    alignItems: "stretch",
  },

  chartTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  
  chartLarge: {
    background: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  chartSmall: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  page: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "16px",
    background: "#e5c29dff",   // light neutral (professional)
    fontSize: "14px",
  },

  headerCenter: {
    textAlign: "center",
    marginBottom: "24px",
    padding: "24px 16px",
    background: "#ffffffff",
    borderRadius: "12px",
  },


  headerTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#111",
  },

  headerSubtitle: {
    fontSize: "16px",
    color: "#63352fff",
  },
};

export default Dashboard;





