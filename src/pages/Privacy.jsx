import LegalPage, { LegalList, LegalSection, LegalText } from "../components/LegalPage.jsx";

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" effective="July 15, 2026">
      <LegalSection title="1. Who We Are">
        <LegalText>
          This Privacy Policy describes how Monarch Resolution ("Monarch," "we," "us," or "our") collects, uses, and shares information about you
          when you visit monarchresolution.com (the "Site"), submit an inquiry, or use our timeshare exit consultation services. Our offices are
          located at 100 Spectrum Center Dr, Suite 900, Irvine, CA 92618. You can reach us at{" "}
          <a href="mailto:info@monarchresolution.com">info@monarchresolution.com</a> or (888) 895-4009.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <LegalText>
          <strong>Information you provide.</strong> When you request a free exit analysis or contact us, we collect the information you submit,
          which may include your name, phone number, email address, your timeshare developer, your annual maintenance fees, how you heard about us,
          and any other details you share with us during consultations or in correspondence.
        </LegalText>
        <LegalText>
          <strong>Information collected automatically.</strong> When you visit the Site, we and our advertising partners automatically collect
          certain information using cookies and similar technologies, including your IP address, browser and device type, the pages you view, the
          page you came from, and general location (such as city or region). See Section 4 for details on the specific technologies we use.
        </LegalText>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <LegalList
          items={[
            "To respond to your inquiry and provide a free consultation and exit analysis.",
            "To provide, manage, and improve our services and the Site.",
            "To contact you by phone, email, or text message about your inquiry and our services (see Section 6).",
            "To measure the effectiveness of our advertising and marketing campaigns.",
            "To comply with legal obligations and enforce our agreements.",
            "To detect, prevent, and address fraud, abuse, or security issues.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Cookies & Advertising Technologies">
        <LegalText>
          We use advertising and analytics technologies provided by third parties to understand how visitors use the Site and to measure the
          performance of our ad campaigns:
        </LegalText>
        <LegalList
          items={[
            <>
              <strong>Microsoft Advertising (UET tag).</strong> Our Site loads Microsoft's Universal Event Tracking tag, which sets cookies and
              collects information about your visit (such as pages viewed and actions taken) so we can measure ad performance and show more relevant
              ads through Microsoft Advertising. Learn more or opt out at{" "}
              <a href="https://account.microsoft.com/privacy/ad-settings" target="_blank" rel="noreferrer">
                Microsoft's ad settings page
              </a>
              .
            </>,
            <>
              <strong>Meta (Facebook) conversion tracking.</strong> When you submit an inquiry, we may share limited information (such as a hashed
              version of your email or phone number) with Meta Platforms, Inc. to measure the performance of our Facebook and Instagram ads. Learn
              more at{" "}
              <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noreferrer">
                Meta's Privacy Policy
              </a>
              .
            </>,
          ]}
        />
        <LegalText>
          You can control cookies through your browser settings, and you can opt out of interest-based advertising through the tools at{" "}
          <a href="https://optout.aboutads.info" target="_blank" rel="noreferrer">
            aboutads.info
          </a>{" "}
          and{" "}
          <a href="https://optout.networkadvertising.org" target="_blank" rel="noreferrer">
            networkadvertising.org
          </a>
          . We also honor the Global Privacy Control (GPC) browser signal where required by law.
        </LegalText>
      </LegalSection>

      <LegalSection title="5. How We Share Information">
        <LegalText>We do not sell your personal information for money. We share information only as follows:</LegalText>
        <LegalList
          items={[
            "Service providers that help us operate our business, such as website hosting, email delivery, customer relationship management, and internal notification tools. These providers may only use your information to perform services for us.",
            "Advertising partners (Microsoft and Meta) as described in Section 4, for ad measurement and campaign optimization. Under some state privacy laws this may be considered \"sharing\" for cross-context behavioral advertising, and you may opt out as described in Section 8.",
            "Legal and safety purposes, such as complying with a subpoena, court order, or other lawful request, or protecting the rights, property, or safety of Monarch, our clients, or others.",
            "Business transfers, if Monarch is involved in a merger, acquisition, or sale of assets, in which case your information may be transferred as part of that transaction.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Communications Consent">
        <LegalText>
          By submitting your contact information through the Site and checking the consent box, you expressly consent to receive calls, text
          messages, and emails from Monarch Resolution about your inquiry and our services, including calls or texts placed using automated
          technology, at the phone number and email address you provide. Consent is not a condition of purchasing any service. Message and data
          rates may apply. You may opt out at any time by replying STOP to a text message, using the unsubscribe link in an email, or contacting us
          directly.
        </LegalText>
      </LegalSection>

      <LegalSection title="7. Data Retention">
        <LegalText>
          We retain personal information for as long as needed to provide our services, comply with legal obligations (including record-keeping
          requirements), resolve disputes, and enforce agreements. When information is no longer needed, we delete or de-identify it.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Your Privacy Rights">
        <LegalText>
          Depending on where you live, you may have rights under state privacy laws such as the California Consumer Privacy Act (CCPA/CPRA),
          including the right to:
        </LegalText>
        <LegalList
          items={[
            "Know what personal information we collect, use, and share about you.",
            "Request a copy of the personal information we hold about you.",
            "Request that we correct inaccurate personal information.",
            "Request that we delete your personal information, subject to legal exceptions.",
            "Opt out of the \"sharing\" of your personal information for cross-context behavioral advertising.",
            "Not be discriminated against for exercising any of these rights.",
          ]}
        />
        <LegalText>
          To exercise any of these rights, email us at <a href="mailto:info@monarchresolution.com">info@monarchresolution.com</a> with the subject
          line "Privacy Request" or call (888) 895-4009. We will verify your identity before fulfilling your request and respond within the
          timeframe required by law. You may also designate an authorized agent to make a request on your behalf.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Security">
        <LegalText>
          We use commercially reasonable administrative, technical, and physical safeguards designed to protect personal information. However, no
          method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        </LegalText>
      </LegalSection>

      <LegalSection title="10. Children's Privacy">
        <LegalText>
          The Site and our services are intended for adults and are not directed to anyone under 18. We do not knowingly collect personal
          information from children. If you believe a child has provided us personal information, contact us and we will delete it.
        </LegalText>
      </LegalSection>

      <LegalSection title="11. Changes to This Policy">
        <LegalText>
          We may update this Privacy Policy from time to time. When we do, we will revise the effective date above and post the updated policy on
          this page. Material changes will be communicated as required by law.
        </LegalText>
      </LegalSection>

      <LegalSection title="12. Contact Us">
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
