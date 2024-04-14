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

          const res = await simplifyText();

          if (res === 500) {
            toast.info("Upload a file");
          } else {
            if (res === 200) {
              toast.success("Simplified");
            } else {
              toast.error("Something Went Wrong");
            }
          }
        }}
      >
        Simplify
      </button>

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
