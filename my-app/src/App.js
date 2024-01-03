import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Expensetracker from "./pages/expensetracker";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="expensetracker" element={<Expensetracker />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
