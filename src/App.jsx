import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NavBar from "./site/NavBar.jsx";
import Footer from "./site/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import ProcessPage from "./pages/Process.jsx";
import AboutPage from "./pages/About.jsx";
import FaqsPage from "./pages/Faqs.jsx";
import ConsultationPage from "./pages/Consultation.jsx";
import PrivacyPage from "./pages/Privacy.jsx";
import TermsPage from "./pages/Terms.jsx";
import ConsentBanner from "./site/ConsentBanner.jsx";
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD } from "./lib/seo.js";

export default function App() {
  const { pathname } = useLocation();

  // Reset scroll on client-side navigation. (Titles/meta are owned by <Seo> per page.)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div>
      {/* Site-wide structured data — present on every page. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_JSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(WEBSITE_JSONLD)}</script>
      </Helmet>

      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
}
