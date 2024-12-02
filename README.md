# Synchronous ChatApp

A modern chat application that allows users to communicate in real-time. This application is built with a focus on simplicity, performance, and security.

## Features

- **Real-Time Messaging**: Send and receive messages instantly.
- **User Authentication**: Secure user login and registration.
- **Profile Management**: Users can update their profiles and manage personal information.
- **Group Chats**: Create and manage group chats with multiple users.
- **Notifications**: Get notified of new messages and activity.
- **Media Sharing**: Share images, videos, and other files within the chat.
- **Search**: Search through chat history and find specific messages.
  
![project-1](https://github.com/user-attachments/assets/9fe02528-7660-4161-a2e0-2940007c51d2)

![Screenshot 2024-08-06 202008](https://github.com/user-attachments/assets/068e1e26-27bb-4425-a780-527b87f5ec6b)

![Screenshot 2024-08-06 201947](https://github.com/user-attachments/assets/f4292a7d-4c09-4788-8ba7-213d26e3a11c)

## Technologies Used

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - Socket.IO (for real-time communication)
  
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (for database)
  - JWT (for authentication)
  - Bcrypt (for password hashing)
  
- **Deployment**:
  - AWS (for hosting and storage)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB
- Docker (optional, for deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chatapp.git
   cd chatapp
   ```

2. **Clone the repository:**
  ```bash
    npm install
    # or
    yarn install
  ```

3. **Set up environment variables:**
  - Create a .env file in the root directory and add the following:
  ```bash
  NODE_ENV=development
  PORT=3000
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  ``` 
4. **Run the application:**
   ```bash
     npm start
     # or
     yarn start
   ```

6. **Access the application:**
   Open your browser and go to http://localhost:3000.
   
### Running Tests

To run tests, use the following command:

```bash
npm test
# or
yarn test
```
## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a new branch, make your changes, and submit a pull request for review. Be sure to follow the project's coding standards and write tests for any new features or bug fixes.

