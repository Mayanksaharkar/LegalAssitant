/* eslint-disable no-unused-vars */
import Context from "./Context";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function ContextProvider({ children }) {
  const [rawText, setRawText] = useState(null);
  const [simpleText, setSimpleText] = useState("");
  const [filePath, setFilePath] = useState("");


  
  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const options = {
      method: "POST",
      body: formData,
      // Set content-type header for FormData
    };

    fetch("http://localhost:9000/upload", options)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        // console.log(res);
        setRawText(res.text);
        setFilePath(res.filePath);
        console.log("filePAthe:", filePath);
      })

      .catch((error) => {
        console.error("Error uploading file:", error);
      });

    if (rawText !== "") {
      return 200;
    } else {
      return 500;
    }
  };

  const simplifyText = async () => {
    if (rawText === undefined || rawText === null || rawText === "") {
      return 500;
    } else {
      try {
        const payload = {
          text: rawText,
        };

        const response = await fetch("http://localhost:9000/simplify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const res = await response.json();
        console.log(res.simplifiedText);
        await  setSimpleText(res.simplifiedText);
        return 200;
      } catch (error) {
        return 400;
      }
    }
  };

  const getFilePath = async () => {
    try {
      const response = await fetch("http://localhost:9000/getFilePath", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      if (response.status == 400) {
        return 400;
      } else {
        if (response.status === 200) {
          const res = await response.json();
          return res.currFilePath;
        } else {
          return 500;
        }
      }
    } catch (e) {
      console.log(e);
      return 400;
    }
    // eslint-disable-next-line no-unreachable
    return 400;
  };

  return (
    <Context.Provider
      value={{
        upload,
        simplifyText,
        simpleText,
        getFilePath,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
