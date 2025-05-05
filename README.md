# Patient Registration System

This project is a **Patient Registration System** designed to streamline the process of registering patients in a healthcare facility. It provides an efficient way to manage patient data and ensures a smooth workflow.

## Features
- Add new patients to the system.
- Query existing patients.
- User-friendly interface.

## Technologies Used
- React TS
- PGlite for database management

## Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/Yathishking/patient-registration.git
  ```
2. Navigate to the project directory:
  ```bash
  cd patient-registration
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

## Usage

1. Start the application:
  ```bash
  npm run dev
  ```
2. Open your browser and navigate to:
  ```
  http://localhost:5173
  ```
## Challenges faced during development:
1. Had to refactor `signup` component to `register` to maintain consistency.
2. Faced problem with PGLite Worker not able to create local db due to directory name error.
3. fixed problem with PGLite not working in initial commit due to typescript errors (fixed by reinstalling Node).
