FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Command to run the Uvicorn server
# Assumes main.py is in the root of the WORKDIR /app (which it will be after COPY . .)
# And the FastAPI app instance is named 'app'
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
