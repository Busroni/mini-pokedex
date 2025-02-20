import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
// import About from "../pages/About";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
