import { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

function Summary() {
  const { simplifyText, simpleText } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Summa: ", simpleText);
  }, [simpleText]);

  const handleSimplify = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await simplifyText();

    if (res === 500) {
      toast.info("Upload a file");
    } else if (res === 200) {
      toast.success("Simplified");
    } else {
      toast.error("Something Went Wrong");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen flex gap-8 flex-col justify-center items-center overflow-y-scroll p-6">
      <button
        className="btn btn-primary gap-2"
        onClick={handleSimplify}
        disabled={isLoading}
      >
        {isLoading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        {isLoading ? "Simplifying..." : "Simplify"}
      </button>

      <div
        className={`${
          simpleText === "" ? "hidden" : ""
        } text-xl p-5 w-[55%] bg-base-300 rounded-2xl text-slate-950 min-h-52 whitespace-pre-wrap`}
      >
        <ReactMarkdown>{simpleText}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Summary;
