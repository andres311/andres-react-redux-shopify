import React, { useState } from 'react'

//constants
import { reciveUpdatesText, signUpForEmailsTitle, signUpButtonText } from "../../constants/texts";
import { emailRegex } from "../../constants/regex";

//icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const Signup = () => {
  
  const signUpNone = "hidden";
  const signUpOK = "hidden";
  const signUpError = "";

  const [ validSignUpClassName, setValidSignUpClassName ] = useState(signUpNone);
  const [ signUpEmail, setSignUpEmail ] = useState('');

  //sign up for emails on change
  const handleSignUpOnChange = (evt) => {
    setSignUpEmail(evt.target.value);
    setValidSignUpClassName(signUpOK);
  }

  //sign up for emails click (action)
  const handleSignUpClick = () => {
    var validEmail = emailRegex.test(signUpEmail);
    if(signUpEmail && validEmail){
      setValidSignUpClassName(signUpOK);
      console.log("SignUp > Valid Email: ", signUpEmail);
    }else{
      setValidSignUpClassName(signUpError);
      console.log("SignUp > Invalid Email: ", signUpEmail); 
    }
  }  

  return (
    <>
      <div className="p-8 rounded-md shadow-lg bg-white">
        <h5 className="text-xl font-bold mb-6">
            {signUpForEmailsTitle}
          <div className="text-indigo-600 text-sm">
            {reciveUpdatesText}
          </div>
        </h5>
        <div className="mt-8 sm:flex justify-center">
          <input 
            value={signUpEmail} 
            autoComplete="off" 
            aria-label="Email address" 
            type="email" 
            onChange={handleSignUpOnChange} 
            required className="appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:max-w-xs"
            placeholder="Enter your email" 
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button 
              onClick={handleSignUpClick}
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              {signUpButtonText}
            </button>
          </div>
        </div>
        <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
          <div className={`${validSignUpClassName} mt-1 bg-red-200 text-red-800 py-2 px-4 rounded-full text-xs font-bold`}>
            Invalid e-mail address
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;




      