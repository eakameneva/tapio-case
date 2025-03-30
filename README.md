# Tapio Front-End Case

## Deployment

*https://tapio-case-2vcf.vercel.app/*

## Project Overview

A simple React CRUD application that interacts with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).\
The app allows users to view, create, update, and delete posts with pagination support.

## Features

- Display a list of posts
- Pagination for handling large datasets
- Basic authentication using local storage (allows users to create, edit, and delete posts)
- Create a new post using a form
- Edit existing posts in an inline form
- Delete posts with a confirmation prompt
- Search for posts
- Global state management using Redux
- Storing data locally using Local Storage
- Error handling with user-friendly feedback
- Responsive design using MUI and Tailwind CSS
- Toast notifications with react-toastify
- Sorting posts by: Title, Author's name(alphabetical order), Default (post creation date)
- Provided pictures are randomly distributed and are only an example of how it could look (API does not provide pictures for posts)

## Technologies Used

- React + TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Toastify for notifications
- Redux Persist for persisting state
- React Hook Form for form validation and handling

## Installation & Setup

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/eakameneva/tapio-case.git
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

   The app will be available at **[http://localhost:5173](http://localhost:5173)**.
