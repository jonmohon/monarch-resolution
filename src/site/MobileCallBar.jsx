import { Link } from "react-router-dom";
import { PhoneIcon } from "../components/icons.jsx";

// Sticky bottom call-to-action bar, mobile only (CSS hides it >960px). Gives
// objection-stage mobile visitors a persistent way to call or start the form
// without hunting through the hamburger menu. tel: clicks here fire the UET
// call_click conversion via the site-wide delegated listener.
export default function MobileCallBar() {
  return (
    <div className="mobile-call-bar">
      <a href="tel:8888954009" className="mobile-call-bar-phone">
        <PhoneIcon />
        Call (888) 895-4009
      </a>
      <Link to="/consultation" className="mobile-call-bar-cta">
        Free Consultation
      </Link>
    </div>
  );
}
