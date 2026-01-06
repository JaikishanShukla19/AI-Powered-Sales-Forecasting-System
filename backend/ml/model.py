from prophet import Prophet
import pandas as pd
import os
import pickle

MODEL_PATH = "models/prophet_model.pkl"

def train_prophet_model(df):
    """
    Input: preprocessed DataFrame with date index and 'sales' column
    Output: trained Prophet model
    """

    # Prophet expects columns: ds (date), y (value)
    prophet_df = df.reset_index()
    prophet_df.rename(columns={"date": "ds", "sales": "y"}, inplace=True)

    # Initialize Prophet model
    model = Prophet(
        daily_seasonality=True,
        weekly_seasonality=True,
        yearly_seasonality=True
    )

    # Train model
    model.fit(prophet_df)

    # Save model
    os.makedirs("models", exist_ok=True)
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)

    return model

def load_prophet_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Trained model not found")

    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)

    return model


def generate_forecast(periods=30):
    """
    periods: number of future days to predict
    """
    model = load_prophet_model()

    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)

    result = forecast[["ds", "yhat"]].tail(periods)
    result.rename(columns={"ds": "date", "yhat": "predicted_sales"}, inplace=True)

    return result
