# Stage 1: Build the React frontend
FROM node:16 AS frontend
WORKDIR /app
COPY agi-chatbot/ .
RUN npm install
RUN npm run build

# Stage 2: Set up the Python Flask backend
FROM python:3.10 AS backend
WORKDIR /app

# Copy the backend files
COPY Backend/ /app/Backend
COPY requirements.txt /app/
COPY .env /app/

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy the React frontend build files to the backend static folder
COPY --from=frontend /app/build /app/Backend/static

# Expose the port Flask will run on
EXPOSE 5000

# Start the Flask application
CMD ["python", "Backend/app.py"]
