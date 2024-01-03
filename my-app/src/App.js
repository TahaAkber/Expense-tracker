import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Expensetracker from "./pages/expensetracker";
import Navbar from "./config/components/navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/expensetracker" element={<Expensetracker />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
