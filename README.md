<div align="center">
  <h1>🏦 CAPITAL</h1>

  <h3>Your Personal Financial Assistant</h3>

  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1000&color=299D36&center=true&vCenter=true&width=500&lines=Full+Stack+Study+Project;Vue.js+%2B+Node.js+Ecosystem;Financial+Organization;End-to-End+Development" alt="Typing SVG" />
  </a>

  <p>
    <img src="https://img.shields.io/github/repo-size/LuanGouveia/capital?style=for-the-badge&color=299D36" alt="Repo Size">
    <img src="https://img.shields.io/github/languages/count/LuanGouveia/capital?style=for-the-badge&color=299D36" alt="Language Count">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/LuanGouveia/capital?style=for-the-badge&color=299D36">
  </p>
</div>

---

## 📖 About The Project

**Capital** is a robust personal finance organization tool developed as a comprehensive **Full Stack study project**.

The primary goal of this project was to master the end-to-end development lifecycle, bridging a dynamic, component-based frontend with a secure and efficient backend API. It allows users to securely register, log in, and manage their financial transactions with a clean and responsive interface.

---

## ✨ Key Features

This project integrates several advanced concepts to create a complete user experience:

* **🔐 Secure Authentication:** Full registration and login flows using JWT (JSON Web Tokens) for secure session management and `bcrypt` for robust password hashing.
* **🛡️ Route Protection:** Implementation of Vue Router Guards to prevent unauthorized access to the dashboard and internal views.
* **📊 Interactive Dashboard:** Visual representation of financial data using Chart.js integrations.
* **🔄 Full CRUD Operations:** Complete Create, Read, Update, and Delete functionality for transactions, utilizing custom Vue components like modal forms (EditModal) for a seamless UX.
* **🏗️ SPA Architecture:** A Single Page Application design with a fixed navigation bar, delivering a fast and fluid native-app feel.

---

## 🛠️ Tech Stack & Tools

The project is built on a solid and modern JavaScript foundation on both client and server sides.

### **Frontend (Client-Side)**
The interface was built focusing on reactivity and component reusability.

| Tech | Description |
| :--- | :--- |
| <img src="https://skillicons.dev/icons?i=vue" width="30"/> **Vue.js 3** | The core progressive framework used for building the user interface. |
| <img src="https://skillicons.dev/icons?i=vite" width="30"/> **Vite** | Next-generation frontend tooling for blazing fast development server and bundling. |
| <img src="https://skillicons.dev/icons?i=html,css,js" width="90"/> | Standard web technologies backbone. |
| ⚙️ **Vue Router** | Handles SPA navigation and implements Route Guards for security. |
| 📈 **Chart.js** | Used for rendering beautiful and informative charts on the dashboard. |

### **Backend (Server-Side)**
The backend handles the "heavy lifting," API routing, and security.

| Tech | Description |
| :--- | :--- |
| <img src="https://skillicons.dev/icons?i=nodejs" width="30"/> **Node.js** | The JavaScript runtime environment for the server. |
| <img src="https://skillicons.dev/icons?i=express" width="30"/> **Express.js** | Fast, unopinionated web framework for building the RESTful API routes. |
| 🔐 **JWT & Bcrypt** | JSON Web Tokens for secure authentication and Bcrypt for password encryption. |
| 🛡️ **Middleware** | Utilizes `cors` (Cross-Origin Resource Sharing), `morgan` (HTTP request logger), and `cookie-parser`. |

### **Database**
Simple and effective relational data modeling.

| Tech | Description |
| :--- | :--- |
| <img src="https://skillicons.dev/icons?i=mysql" width="30"/> **MySQL** | Relational database management system used to store user profiles and transaction records. |

---

## 📸 Screenshots

<div align="center">

### Dashboard View
*Visual overview of finances with charts.*

<br/><br/>



</div>

---

## 🚀 Getting Started

To run this project locally, follow these steps.

### Prerequisites

* Node.js installed (LTS version recommended)
* MySQL Server installed and running

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR GITHUB USERNAME]/capital.git
    cd capital
    ```

2.  **Database Setup**
    * Create a new MySQL database (e.g., `capital_db`).
    * Import the provided SQL script (if available) or manually create the `users` and `transactions` tables based on the backend models.

3.  **Backend Setup**
    * Navigate to the backend folder (e.g., `cd backend` or `cd server`).
    * Install dependencies:
        ```sh
        npm install
        ```
    * **Create a `.env` file** in the backend root and configure your variables (DB credentials, JWT secret, port):
        ```env
        DB_HOST=localhost
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=capital_db
        JWT_SECRET=your_super_secret_key
        PORT=3000
        ```
    * Start the server:
        ```sh
        npm run dev
        ```

4.  **Frontend Setup**
    * Open a new terminal and navigate to the frontend folder (e.g., `cd frontend` or `cd client`).
    * Install dependencies:
        ```sh
        npm install
        ```
    * Start the Vite development server:
        ```sh
        npm run dev
        ```

5.  **Access the App**
    Open your browser and navigate to the address shown in your frontend terminal (usually `http://localhost:5173`).

---

## 👤 Author

Developed with passion by **Gouveia**.

* LinkedIn: [Luan gouveia](https://www.linkedin.com/in/luangoouveia/)
* GitHub: [@LuanGouvia](https://github.com/LuanGouveia)

---

<div align="center">
  <sub>Built for study purposes. © 2023 Capital.</sub>
</div>
