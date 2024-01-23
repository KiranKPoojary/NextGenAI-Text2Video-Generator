# Text-Video Generator

This project is a Text-Video Generator that utilizes a Hugging Face model. The backend is implemented in Google Colab, and the frontend is built using ReactJS. The connection between the Flask backend and the ReactJS frontend is established using ngrok tunneling.

## Features

- Generate videos based on input text using a pre-trained Hugging Face model.
- Utilizes Google Colab as the backend for model processing.
- ReactJS frontend provides a user-friendly interface.
- ngrok tunnel ensures seamless communication between the backend and frontend.

## Requirements

- Node.js
- Python
- Flask
- ngrok
- Hugging Face Transformers Library

## Setup

### Backend (Google Colab)

1. Open the `backend/Colab_Backend.ipynb` notebook in Google Colab.
2. Follow the instructions in the notebook to set up and run the backend.

### Frontend (ReactJS)

1. Navigate to the `frontend` directory.
2. Install dependencies using:

   ```bash
   npm install
   ```
