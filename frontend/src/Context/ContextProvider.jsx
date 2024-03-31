/* eslint-disable no-unused-vars */
import Context from "./Context";
import { useState } from "react";
import axios from "axios";
import { OpenAI } from "openai";

// eslint-disable-next-line react/prop-types
function ContextProvider({ children }) {
  const [rawText, setRawText] = useState(null);
  const [simpleText, setSimpleText] = useState("");
  const upload = (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:8090/upload", formData)
        .then((res) => {
          console.log(res.data);
          setRawText(res.data);
        })
        .catch((er) => console.log(er));
    } catch (error) {
      console.log(error);
    }
  };
  const simplifyText = async () => {
    try {
      const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `${rawText} "simplify this for a non legal professional you can discard signiture part if exists - give the response in markdown language"`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0].message.content);
      setSimpleText(completion.choices[0].message.content);
    } catch (error) {
      console.log(error);
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
