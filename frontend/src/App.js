import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/common/Login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
