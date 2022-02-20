import React, { useState } from 'react'

//constants
import { reciveUpdatesText, signUpForEmailsTitle, signUpButtonText } from "../../constants/texts";
import { emailRegex } from "../../constants/regex";

//icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const Signup = () => {
  
  const signUpNone = "border-gray-100";
  const signUpOK = "border-green-600";
  const signUpError = "border-rose-600";

  const [ validSignUpClassName, setValidSignUpClassName ] = useState(signUpNone);
  const [ signUpEmail, setSignUpEmail ] = useState('');

  //sign up for emails on change
  const handleSignUpOnChange = (evt) => {
    setSignUpEmail(evt.target.value);
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
      <hr/>
      <div className="bg-white p-6 pt-2">
        <div className="text-center p-4">
          <div className="text-xl p-2 font-medium">
            {signUpForEmailsTitle}
          </div>
          <div className="p-1 mb-2">
            {reciveUpdatesText}
          </div>
          <div className="flex justify-center">
            <div className={`flex justify-centertext-gray900 p-2 rounded-lg bg-gray-100 max-w-md border-2 ${validSignUpClassName}`}>
              <input value={signUpEmail} autoComplete="off" placeholder="Your Email" className="bg-gray-100 w-2/3 p-2 rounded-lg focus:border-transparent" onChange={handleSignUpOnChange} />
              <button className="bg-gray-100 float-right w-1/3 text-sm text-blue-800 hover:scale-105 transition duration-300 ease-in-out ml-1" onClick={handleSignUpClick}>{signUpButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;




      