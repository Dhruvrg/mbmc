import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Upload from "./Components/Upload";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import UserState from "./context/UserState";
import ExcelData from "./Components/ExcelData.js";

function App() {
  return (
    <div>
      <UserState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/upload" element={<Upload />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/exceldata" element={<ExcelData />} />
          </Routes>
          <Footer />
        </Router>
      </UserState>
    </div>
  );
}

export default App;
