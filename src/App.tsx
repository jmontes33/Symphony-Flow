import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Context from "./components/Context";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Context />} />
      </Routes>
    </Router>
  )
}

export default App;
