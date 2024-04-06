import { useContext } from "react";
import Context from "../Context/Context";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

function Summary() {
  const { simplifyText, simpleText } = useContext(Context);

  return (
    <div className='w-screen h-screen flex gap-8 flex-col justify-center items-center overflow-y-scroll   '>
      <button
        className='btn btn-primary'
        onClick={async (e) => {
          e.preventDefault();
          // setIsLoading(true);
          const res = await simplifyText();
          console.log(res);
          if (res === 500) {
            toast.error("Data Not Found , Try Again");
          }
          if (res === 400) {
            toast.error("Something Went Wrong!");
          }
          if (res === 200) {
            toast.success("Document Simplified");
          }
        }}
      >
        Simplify
      </button>

      {/* <div className='text-white text-2xl p-5 w-[55%] h-min bg-base-300 rounded-2xl flex justify-center items-center'>
        Loading...
      </div> */}

      <div
        className={`${
          simpleText === "" ? "hidden" : ""
        } text-2xl p-5 w-[55%] h-min bg-base-300 rounded-2xl text-slate-950 min-h-52`}
      >
        <ReactMarkdown>{simpleText}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Summary;
