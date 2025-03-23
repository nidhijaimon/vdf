import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  // Make sure this path is correct
import Upload from "./pages/Upload";
import SymptomEntry from "./pages/SymptomEntry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/symptoms" element={<SymptomEntry />} />
      </Routes>
    </Router>
  );
}

export default App;



