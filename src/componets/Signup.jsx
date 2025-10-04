import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (name.trim() === "") {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (email.trim() === "") {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    // Store data
    localStorage.setItem(email, JSON.stringify({ name, email, password }));

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center gap-4 h-screen bg-black">
      <div className="px-5 py-10 rounded-xl flex flex-col justify-start items-center gap-4 bg-purple-400">
        <div className="w-full">
          <p className="text-3xl font-bold mb-4">Sign Up</p>
        </div>

        <input
          type="text"
          className="rounded-md p-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="text-red-500">Name is required</p>}

        <input
          type="text"
          className="rounded-md p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500">Invalid Email format</p>}

        <input
          type="password"
          className="rounded-md p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="text-red-500">Invalid Password format</p>}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
