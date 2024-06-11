import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Test1 from "./Pages/Test1";
import Test2 from "./Pages/Test2";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </>
  );
};

export default App;
