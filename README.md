# MERN Stack AI Content Generation Project

## Overview

This is a MERN stack project designed for AI content generation using the OpenAI API. The application features user authentication and authorization, Stripe payment integration, and a user dashboard. This project demonstrates the use of modern web technologies to build a scalable and interactive content generation platform.
## Project Demo

Click the image below to watch the video:

[![Watch the video](https://github.com/user-attachments/assets/98753998-ce20-484c-9eb7-c82673358961)](https://youtu.be/hcJgZDJMNJ8)


## Features

- **AI Content Generation**: Leverages the OpenAI API to generate content based on user input.
- **User Authentication & Authorization**: Secure login and registration system with role-based access control.
- **Stripe Integration**: Allows users to make payments for premium features and subscriptions.
- **User Dashboard**: Provides users with an interactive interface to manage their content and view payment history.
- **Responsive Design**: Ensures the application is usable on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Stripe
- **Authentication**: JWT (JSON Web Tokens)
- **AI API**: OpenAI API

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB
- Stripe Account
- OpenAI API Key

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/your-repository.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd your-repository
    ```

3. **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

4. **Install Frontend Dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

5. **Set Up Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    PORT=8090
    MONGODB_URI=MONGO_ATLAS
    JWT_SECRET=your-jwt-secret
    STRIPE_SECRET_KEY=your-stripe-secret-key
    OPENAI_API_KEY=your-openai-api-key
    ```

    Create a `.env` file in the `frontend` directory and add the following variable:

    ```
    REACT_APP_API_URL=http://localhost:3000
    ```

6. **Start the Application:**

    - **Start Backend Server:**

      ```bash
      cd backend
      npm start
      ```

    - **Start Frontend Server:**

      ```bash
      cd ../frontend
      npm start
      ```

### Usage

1. **Navigate to the Application in Your Browser:**

   Open `http://localhost:3000` to access the application.

2. **Create an Account or Log In:**

   Use the authentication system to create a new account or log in with existing credentials.

3. **Explore Features:**

   - Generate AI content using the provided interface.
   - Make payments through Stripe for premium features.
   - Manage your content and view payment history on the dashboard.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and create a pull request. Ensure that your changes are well-documented and tested.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact [rp9936123@gmail.com.com].

