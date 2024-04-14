/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Context from "../Context/Context";
import { Document, Page } from "react-pdf";

function ChatInterFace() {
  const { rawText } = useContext(Context);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Your Legal Assistant ! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const API_KEY = "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";
  const systemMessage = {
    role: "system",
    content: `${rawText} \n you are a legal assistant , yow will be asked some question related to this , and you have to give the answer in simple words`,
  };

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "AI Legal Assistant",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center align-middle'>
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content='Assistant is typing' />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

const PdfViewer = ({ pdfPath }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Document file={pdfPath}>
        <Page pageNumber={1} />
      </Document>

      <div>
        <iframe src={pdfPath} width='800' height='600' title='Embedded PDF' />
      </div>
    </div>
  );
};

const Chat = () => {
  const { filePath } = useContext(Context);

  return (
    <div className='flex justify-center items-center align-middle w-screen h-screen'>
      <div>
        <PdfViewer pdfPath={filePath} />
      </div>
      <div>{filePath !== null ? <ChatInterFace /> : <></>}</div>
    </div>
  );
};

export default Chat;
