import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import CountryPage from './pages/CountryPage'
import About from './pages/AboutPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import Header from './components/Header'
import Footer from './components/Footer' // Import the Footer component
import Landing from './pages/Landing'
import { Toaster } from 'react-hot-toast';

function AppWrapper() {
  const location = useLocation();
  const hideHeaderFooterOn = ['/']; // paths where you want to hide the header and footer

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {!hideHeaderFooterOn.includes(location.pathname) && <Header />}
      <div className="flex-grow">
      <Toaster />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country/:name" element={<CountryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {!hideHeaderFooterOn.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;