import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./componets/Home.jsx";
import Signup from "./componets/Signup.jsx";
import Login from "./componets/LoginPage.jsx";
import Dashboard from "./componets/dashboard.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.jsx";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  const isAuthenticated = () => {
    return localStorage.getItem("authToken");
  };

  return (
    <Router>
      <div className="relative">
        {/* Login modal */}
        {showLogin && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <Login closeLogin={() => setShowLogin(false)} />
          </div>
        )}

        {/* Main app with conditional blur */}
        <div className={showLogin ? "blur-sm pointer-events-none" : ""}>
          <Routes>
            <Route path="/" element={<Home openLogin={() => setShowLogin(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={isAuthenticated() ? 
                <ExpenseProvider>
                  <Dashboard />
                </ExpenseProvider>
               : 
              <Navigate to="/" replace />}
            />
            <Route path="*" element={<>404</>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
