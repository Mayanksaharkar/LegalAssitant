import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Summary from "./Components/Summary";
import "./App.css";
import Layout from "./Components/Layout";
import GetStarted from "./Components/GetStarted";
import ContextProvider from "./Context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GetStarted />} />
            <Route path="/home" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
