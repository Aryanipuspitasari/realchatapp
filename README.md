# Real-Time Chat App
The Real-Time Chat App is my first full-stack project aimed at fulfilling my backend module in a solo project. In this project, I created the backend functionalities for user authentication, including login and signup. Users can create tokens after authentication and are able to send messages, which are stored for each user. The app authenticates users with tokens to display their respective messages. Validation is implemented for login and signup requests in the backend.

## Features
- User authentication with login and signup functionality
- Token generation after authentication
- Sending and storing messages for each user
- Authentication with tokens to display user-specific messages
- Validation for login and signup requests


## Technologies Used
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Frontend Styling: CSS

## Installation
To run the Real-Time Chat App locally, follow these steps:
1. Clone the repo
2. Navigate to the project directory
3. Install dependencies for both the frontend and backend
4. Set up the environment variable and create a .env file in backend directory
5. start the backend (nodemon server.js)
6. Start the frontend (npm run dev)

#### Note: Before running the Real-Time Chat App, ensure the following:

1. MongoDB Database: Start the MongoDB database server to enable data storage for the application.

2. OpenAI Key: Obtain an API key from OpenAI to enable the app's functionality. The key allows access to OpenAI's services, which are utilized within the application.

By fulfilling these requirements, you can ensure smooth functioning of the Real-Time Chat App.

## Usage
Once the application is running, you can:

- Sign up for a new account or log in with existing credentials.
- Send messages in real-time and view messages from other users.
- Logout from the application.
