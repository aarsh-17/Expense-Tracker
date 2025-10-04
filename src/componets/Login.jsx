import { useState } from "react";
import {useNavigate} from 'react-router-dom'

import {X} from 'lucide-react';
const Login=()=>{
  const [isSignup,setIsSignup]= useState(false);
  
  const[email,setEmail]= useState('')
  const[password,setPassword]= useState('')
  const [error, setError] = useState(false);
    const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const navigate=useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    
    console.log(email,password);
    
    if (isSignup) {
      console.log(email,password);
      
      // SIGNUP logic
      if (email === "") {
        setEmailerror(true);
        return;
      }
      if (password === "") {
        setPassworderror(true);
        return;
      }
     localStorage.setItem(email,JSON.stringify({email,password}));
      
      navigate("/");
    } else {
      // LOGIN logic
      try {
        const user = JSON.parse(localStorage.getItem(email));
        console.log(user);
        
        
        
        
        if (user && user.password === password) {
          localStorage.setItem("authToken", true);
         
          navigate("/dashboard");
        } else {
          throw new Error();
        }
      } catch {
        setError(true);
      }
    }
  };
  return(
    <>
    <div className='flex  justify-center items-center gap-4 h-screen bg-transparent'>
    <div className='px-5 py-10 rounded-xl flex flex-col justify-start items-center gap-4  bg-purple-400'>
      <div className=' w-full flex flex-rows justify-between items-center'>
        <p className='text-3xl font-bold mb-4'>{!isSignup?<>Log In</>:<>SignUp</>}</p>
       
        </div>
    <input type="text" className='rounded-md p-2' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" className='rounded-md p-2' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
    {error && <p className="text-red-500">Invalid email or password</p>}
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlesubmit}>submit</button>
     <button
          onClick={() => {
            setIsSignup(!isSignup);
            setEmail('');
            setPassword('');
            setError(false);
            setEmailerror(false);
            setPassworderror(false);
          }}
          className="text-white underline text-sm"
        >
          {isSignup ? "Already have an account? Log In" : "Don’t have an account? Sign Up"}
        </button>
    
    </div>
    </div>
    </>
    
    )
}

export default Login