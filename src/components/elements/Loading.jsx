import React from "react";
import LoadingSpinner from "../../assets/Spinner-1s-40px.svg";

const Loading = () => {
  return (
    <div className="flex h-screen bg-slate-600">
        <div className="m-auto">
            <img src={LoadingSpinner} alt="Loading Icon" />
        </div>    
    </div>
  );
};

export default Loading;
