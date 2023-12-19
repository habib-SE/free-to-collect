import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../src/components/landingPage/LandigPage"
import { About } from "./components/about/About";
import { Contact } from "./components/contact/Contact";
import { Navbar } from "./components/common/navbar/Navbar";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import Admin from "./components/admin/Admin";
import { DonateNow } from "./components/donateNow/DonateNow";
import { Footer } from "./components/footer/Footer";

export const Router = () => {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/donate-now" element={<DonateNow />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/donation-form" element={<Admin />} />
      </Routes>
      <Footer/>
    </>
  );
};