# Healthcare Services API

This project provides a simple RESTful API to manage healthcare services. It allows you to add, get, update, and delete services using **Node.js** and **Express** with a **MongoDB** backend.

## Requirements

- Node.js (version 14 or higher)
- MongoDB (version 4 or higher)

## Setup Instructions

### 1. Clone the repository
Clone the project repository to your local machine.

```bash
git clone <repository-url>
cd healthcare-services-api

Run the following command to install the required dependencies.
npm install

Make sure MongoDB is installed and running on your local machine. You can download it from MongoDB official website.

Alternatively, you can use a cloud MongoDB service like MongoDB Atlas.

Update the .env file with your MongoDB URI:

MONGO_URI=mongodb://localhost:27017/healthcare-services
PORT=3000

Run the following command to start the server.

npm start

Your server will be running at http://localhost:3000