import ContentCreation from "./components/ContentCreation";
import ImgToText from "./components/ImageToText";
import Summarize from "./components/Summarize";
import { Routes , Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Admin from "./components/ADMIN/Admin";

function App() {
  return (
    <>

      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="summarize" element={<Summarize />} />
          <Route path="contentWriter" element={<ContentCreation />} />
          <Route path="text-img" element={<ImgToText />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
      </Routes>
      <Footer/>

    </>
  );
}

export default App;
