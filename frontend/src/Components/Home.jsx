import { useContext, useState } from "react";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [file, setFile] = useState(null);
  const { upload } = useContext(Context);
  const navigateto = useNavigate();

  return (
    <div className='w-screen h-screen  justify-center items-center align-middle bg-base-300 flex-col flex gap-5'>
      <div className='text-4xl text-black '>
        Upload Legal Document in PDF Format
      </div>
      <div className='border border-primary rounded-xl p-10 h-min flex flex-col gap-7 justify-center align-middle items-center'>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <button
          className={`btn btn-primary ${file === null ? "btn-disabled" : ""}`}
          type='button'
          onClick={async (e) => {
            e.preventDefault();
            const res = await upload(file);
            
            if (res === 200) {
              toast.success("Document Uploaded!");
              navigateto("/summary");
            }
            if (res === 500) {
              toast.error("Something Went Wrong!");
            }
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default Home;
