import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

import App from "./App";
// import style
import './styles/style.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Render SearchBar ke #search-container
ReactDOM.createRoot(document.getElementById("search-container")).render(<SearchBar />);
ReactDOM.createRoot(document.getElementById("footer")).render(<Footer />);
