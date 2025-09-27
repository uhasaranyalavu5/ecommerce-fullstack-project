# Full-Stack E-Commerce Admin Dashboard

This is a comprehensive e-commerce administration panel built with a modern, decoupled architecture using Django REST Framework for the backend and React for the frontend.

## Features

-   **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
-   **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products, including image uploads.
-   **Customer Management:** Full CRUD functionality for customer records.
-   **Shopping Cart:** A functional cart system allowing users to add and remove items.
-   **Professional UI:** A clean, multi-page interface with a dashboard, sidebar, and forms, built with React-Bootstrap.
-   **Custom User Model:** Utilizes a custom Django user model for future scalability.

## Technology Stack

-   **Backend:** Python, Django, Django REST Framework, Simple JWT
-   **Frontend:** React, React Router, React-Bootstrap, Axios
-   **Database:** MySQL

## Project Setup

### Backend Setup

1.  Navigate to the `backend` directory: `cd backend`
2.  Create and activate a virtual environment.
3.  Install the required packages: `pip install -r requirements.txt`
4.  Set up your MySQL database and update the credentials in `core/settings.py`.
5.  Run database migrations: `python manage.py migrate`
6.  Create a superuser: `python manage.py createsuperuser`
7.  Start the server: `python manage.py runserver`

### Frontend Setup

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install the necessary packages: `npm install`
3.  Start the development server: `npm run dev`
