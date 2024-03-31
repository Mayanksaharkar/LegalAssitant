import React, { useEffect, useContext, useState } from "react";
import Context from "../Context/Context";
import ReactMarkdown from "react-markdown";

function Summary() {
  const { simplifyText, simpleText } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    simplifyText().then(() => setIsLoading(false));
  }, []);

  return (
    <div className='w-screen h-screen flex gap-8 flex-col justify-center items-center overflow-y-scroll   '>
      <button
        className='btn btn-primary'
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);
          simplifyText().then(() => setIsLoading(false));
        }}
      >
        Simplify
      </button>
      {isLoading ? (
        <div className='text-white text-2xl p-5 w-[55%] h-min bg-base-300 rounded-2xl flex justify-center items-center'>
          Loading...
        </div>
      ) : (
        <div className='text-white text-2xl p-5 w-[55%] h-min bg-base-300 rounded-2xl'>
          <ReactMarkdown>{simpleText}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Summary;
