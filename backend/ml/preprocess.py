import pandas as pd

def preprocess_sales_data(file_path):
    """
    Input: path to uploaded CSV/Excel file
    Output: cleaned pandas DataFrame ready for forecasting
    """

    # 1. Load data
    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    # 2. Validate required columns
    required_cols = {"date", "sales"}
    if not required_cols.issubset(df.columns):
        raise ValueError("CSV must contain 'date' and 'sales' columns")

    # 3. Convert date column to datetime
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # 4. Remove rows with invalid dates
    df = df.dropna(subset=["date"])

    # 5. Convert sales to numeric
    df["sales"] = pd.to_numeric(df["sales"], errors="coerce")

    # 6. Handle missing sales values
    df["sales"] = df["sales"].fillna(method="ffill")

    # 7. Sort by date
    df = df.sort_values("date")

    # 8. Set date as index (important for time-series)
    df.set_index("date", inplace=True)

    # 9. Ensure daily frequency (important for SARIMA / Prophet)
    df = df.asfreq("D")

    # 10. Handle missing days (after frequency setting)
    df["sales"] = df["sales"].fillna(method="ffill")

    return df
