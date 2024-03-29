import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
