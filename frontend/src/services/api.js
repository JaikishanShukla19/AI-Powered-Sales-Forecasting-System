const BASE_URL = "http://127.0.0.1:5000";

export function getDashboardMetrics() {
  return fetch(`${BASE_URL}/dashboard-metrics`)
    .then((res) => res.json());
}
