import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./site/NavBar.jsx";
import Footer from "./site/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import ProcessPage from "./pages/Process.jsx";
import AboutPage from "./pages/About.jsx";
import FaqsPage from "./pages/Faqs.jsx";
import ConsultationPage from "./pages/Consultation.jsx";

const TITLES = {
  "/": "Monarch Resolution — Timeshare Exit Experts",
  "/process": "Our Process — Monarch Resolution",
  "/about": "About Us — Monarch Resolution",
  "/faqs": "FAQs — Monarch Resolution",
  "/consultation": "Free Exit Consultation — Monarch Resolution",
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = TITLES[pathname] || TITLES["/"];
  }, [pathname]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
