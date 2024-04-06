/* eslint-disable no-unused-vars */
import Context from "./Context";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function ContextProvider({ children }) {
  const [rawText, setRawText] = useState(null);
  const [simpleText, setSimpleText] = useState("");
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
        const res = await response.text();
        // console.log(res);
        setRawText(res);
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
    if (rawText !== "" || undefined || null) {
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
        console.log(res.simpleText);
        setSimpleText(res.simpleText);
        return 200;
      } catch (error) {
        return 400;
      }
    } else {
      return 500;
    }
  };

  return (
    <Context.Provider
      value={{
        upload,
        simplifyText,
        simpleText,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
