# 🌍 World Explorer

**World Explorer** is a responsive, modern web application built with **React** and powered by the **REST Countries API**. It allows users to explore detailed country information, manage user authentication using **Firebase**, and provides a clean UI with light/dark mode support. The app also includes unit testing using **Jest** and **React Testing Library**.

---

## 🚀 Features

- 🔍 **Search & Filter**: Browse countries by name, region, or language.
- 📄 **Country Details**: View capital, region, population, borders, languages, and more.
- 🔐 **Authentication**: Sign up, sign in, and sign out with Firebase.
- 🌙 **Dark Mode Support**: Toggle between light and dark themes.
- 🧪 **Testing**: Unit and integration tests using Jest and React Testing Library.
- 🌐 **API Integration**: Uses REST Countries API v3.1.

---

## 🛠️ Tech Stack

- **React** (Vite)
- **Firebase** (Authentication + Firestore)
- **REST Countries API**
- **React Router**
- **Tailwind CSS**
- **Jest + React Testing Library**

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or above)
- npm

### Clone the Repository

```bash
git clone https://github.com/thakshilaCodes/world_explorer.git
```

### Install Dependencies

```bash
npm install
```

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Email/Password Authentication** under the **Authentication** tab.
3. Create a **Firestore database** (in test mode for development).
4. Add a new **web app** and copy the Firebase config.
5. Paste the config inside `src/firebase.js`:

```js
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```


---

## 🧪 Running Tests

The project uses **Jest** and **React Testing Library**.

```bash
npm test
```


## 💻 Running the App Locally

Start the development server:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build for Production

```bash
npm run build
```

---

## 🧾 Report

### ✅ Chosen APIs

- **REST Countries API**  
  Public API that returns comprehensive information about countries, including flags, names, regions, languages, borders, etc.  
  Endpoint: [https://restcountries.com/v3.1/all](https://restcountries.com/v3.1/all)

- **Firebase Authentication**  
  Used for secure user login, signup, and logout features via email and password.

---

### 🧱 Challenges Faced & Solutions

#### 1. `window is not defined` error during Jest tests
- **Cause**: Firebase Analytics uses the browser window object which isn’t available in test (Node) environments.
- **Solution**: Wrapped the analytics call inside `if (typeof window !== 'undefined')`, and removed analytics from test configs.

#### 2. Module import issues in test files
- **Cause**: Relative path imports failed when incorrect or missing extensions.
- **Solution**: Ensured correct relative paths and updated import statements to include file extensions where needed (e.g., `./AuthContext.jsx`).

#### 3. Missing or inconsistent data from REST Countries API
- **Cause**: Some countries lack certain fields like `borders`, `capital`, or `languages`.
- **Solution**: Used optional chaining (e.g., `country.capital?.[0]`) and fallback values to prevent crashes.

#### 4. AuthContext not available during testing
- **Cause**: Components relying on context threw errors during test execution.
- **Solution**: Wrapped tested components inside `<AuthProvider>` in tests and mocked Firebase Auth methods.

---

## 🙋 Author

- 👤 **Thakshila Fonseka-IT22126092**
- 🔗 GitHub: [@thakshilaCodes](https://github.com/thakshilaCodes)
- 📧 Email: thakshilafonseka2002@gmail.com

---
