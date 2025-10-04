import { Outlet } from "react-router-dom";
import { useState } from "react";
import Login from "./componets/login.jsx";

const LoginModalWrapper = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className={showLogin ? "blur-sm transition-all" : ""}>
        <Outlet context={{ setShowLogin }} />
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <Login closeLogin={() => setShowLogin(false)} />
        </div>
      )}
    </>
  );
};

export default LoginModalWrapper;
