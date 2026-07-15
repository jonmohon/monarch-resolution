import { Link } from "react-router-dom";
import LegalPage, { LegalList, LegalSection, LegalText } from "../components/LegalPage.jsx";

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" effective="July 15, 2026">
      <LegalSection title="1. Agreement to These Terms">
        <LegalText>
          These Terms of Service ("Terms") govern your use of monarchresolution.com (the "Site"), operated by Monarch Resolution ("Monarch," "we,"
          "us," or "our"), and any inquiry you submit through it. By accessing the Site or submitting a consultation request, you agree to these
          Terms and our <Link to="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the Site.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Our Services">
        <LegalText>
          Monarch Resolution provides timeshare exit consultation and advocacy services, helping timeshare owners pursue cancellation or exit from
          their timeshare contracts. The Site provides general information about those services and allows you to request a free consultation.
        </LegalText>
        <LegalText>
          <strong>Monarch Resolution is not a law firm and does not provide legal advice.</strong> Nothing on the Site, and nothing communicated
          during a consultation, constitutes legal advice, and no attorney-client relationship is created by using the Site or speaking with us.
          Where a file requires legal work, it may be referred to independent licensed attorneys.
        </LegalText>
      </LegalSection>

      <LegalSection title="3. No Guarantee of Outcome">
        <LegalText>
          Every timeshare contract and developer is different. Any timelines, examples, or past results described on the Site are illustrative and
          do not guarantee a particular outcome, timeline, or result for your situation. The options available to you will be assessed individually
          during your consultation and set out in a written service agreement before any engagement begins.
        </LegalText>
      </LegalSection>

      <LegalSection title="4. Consultations and Engagement">
        <LegalText>
          Submitting a consultation request or receiving a free exit analysis does not create a client relationship or obligate either party.
          Any engagement of Monarch's services is governed exclusively by a separate written service agreement signed by you and Monarch, including
          its terms on fees, scope, and refunds. If these Terms conflict with a signed service agreement, the service agreement controls for the
          services it covers.
        </LegalText>
      </LegalSection>

      <LegalSection title="5. Communications Consent">
        <LegalText>
          By submitting your contact information and checking the consent box, you expressly consent to be contacted by Monarch by phone, email, and
          text message about your inquiry, including via automated technology, as described in our <Link to="/privacy">Privacy Policy</Link>. Consent is
          not a condition of purchase, and you may opt out at any time.
        </LegalText>
      </LegalSection>

      <LegalSection title="6. Eligibility and Acceptable Use">
        <LegalText>You must be at least 18 years old to use the Site or request a consultation. You agree not to:</LegalText>
        <LegalList
          items={[
            "Submit false, misleading, or fraudulent information, or impersonate any person or entity.",
            "Use the Site in any way that violates applicable law or regulation.",
            "Attempt to interfere with, disrupt, or gain unauthorized access to the Site, its servers, or connected systems.",
            "Scrape, copy, or harvest content or data from the Site by automated means without our written permission.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <LegalText>
          The Site and its content — including text, graphics, logos, images, and design — are owned by Monarch or its licensors and are protected
          by copyright, trademark, and other intellectual property laws. You may view and print Site content for your personal, non-commercial use;
          any other use requires our prior written consent.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Third-Party Links and Services">
        <LegalText>
          The Site may contain links to third-party websites or services. We do not control and are not responsible for the content, policies, or
          practices of any third party. Accessing third-party sites is at your own risk.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Disclaimers">
        <LegalText>
          THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE,
          OR FREE OF HARMFUL COMPONENTS, OR THAT INFORMATION ON THE SITE IS COMPLETE, ACCURATE, OR CURRENT.
        </LegalText>
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <LegalText>
          TO THE FULLEST EXTENT PERMITTED BY LAW, MONARCH AND ITS OWNERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR USE OF THE
          SITE. IN NO EVENT WILL MONARCH'S TOTAL LIABILITY ARISING OUT OF THE USE OF THE SITE EXCEED ONE HUNDRED DOLLARS ($100). THIS SECTION DOES
          NOT LIMIT ANY LIABILITY THAT CANNOT BE LIMITED UNDER APPLICABLE LAW, AND DOES NOT APPLY TO SERVICES GOVERNED BY A SIGNED SERVICE
          AGREEMENT, WHICH CONTAINS ITS OWN TERMS.
        </LegalText>
      </LegalSection>

      <LegalSection title="11. Indemnification">
        <LegalText>
          You agree to indemnify and hold harmless Monarch and its owners, employees, and agents from any claims, damages, liabilities, and expenses
          (including reasonable attorneys' fees) arising out of your violation of these Terms or your misuse of the Site.
        </LegalText>
      </LegalSection>

      <LegalSection title="12. Governing Law and Venue">
        <LegalText>
          These Terms are governed by the laws of the State of California, without regard to its conflict-of-law rules. Any dispute arising out of
          these Terms or your use of the Site that is not resolved informally will be brought exclusively in the state or federal courts located in
          Orange County, California, and you consent to their jurisdiction. Before filing any claim, you agree to contact us at{" "}
          <a href="mailto:info@monarchresolution.com">info@monarchresolution.com</a> and give us 30 days to attempt to resolve the dispute
          informally.
        </LegalText>
      </LegalSection>

      <LegalSection title="13. Changes to These Terms">
        <LegalText>
          We may update these Terms from time to time. When we do, we will revise the effective date above and post the updated Terms on this page.
          Your continued use of the Site after changes take effect constitutes acceptance of the revised Terms.
        </LegalText>
      </LegalSection>

      <LegalSection title="14. Contact Us">
        <LegalText>
          Monarch Resolution
          <br />
          100 Spectrum Center Dr, Suite 900
          <br />
          Irvine, CA 92618
          <br />
          <a href="mailto:info@monarchresolution.com">info@monarchresolution.com</a>
          <br />
          (888) 895-4009
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
}
