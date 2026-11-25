import Banner from "../../components/home/banner/Banner";
import TrustSection from "../../components/home/trust/TrustSection";
import StatsSection from "../../components/home/stats/StatsSection";
import BankingOverviewSection from "../../components/home/overview/BankingOverviewSection";
import BankingServicesSection from "../../components/home/services/BankingServicesSection";
import SecuritySection from "../../components/home/security/SecuritySection";
import DigitalBankingSection from "../../components/home/digital/DigitalBankingSection";
import TestimonialsSection from "../../components/home/testimonials/TestimonialsSection";
import LeadershipSection from "../../components/home/leadership/LeadershipSection";
import ContactSection from "../../components/home/contact/ContactSection";
import NewsletterSection from "../../components/home/newsletter/NewsletterSection";
import Footer from "../../components/common/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Section 2 — Existing Hero Banner */}
      <section id="hero">
        <Banner />
      </section>

      {/* Section 3 — Existing Trust Highlights */}
      <section id="trust">
        <TrustSection />
      </section>

      {/* Section 4 — Banking Statistics */}
      <section id="stats">
        <StatsSection />
      </section>

      {/* Section 5 — Banking Overview */}
      <section id="overview">
        <BankingOverviewSection />
      </section>

      {/* Section 6 — Banking Services */}
      <section id="services">
        <BankingServicesSection />
      </section>

      {/* Section 7 — Security and Protection */}
      <section id="security">
        <SecuritySection />
      </section>

      {/* Section 8 — Digital Banking and How It Works */}
      <section id="digital-banking">
        <DigitalBankingSection />
      </section>

      {/* Section 9 — Customer Testimonials */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Section 10 — Leadership Team */}
      <section id="leadership">
        <LeadershipSection />
      </section>

      {/* Section 11 — Contact and Support */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Section 12 — Newsletter */}
      <section id="newsletter">
        <NewsletterSection />
      </section>

      {/* Section 13 — Footer */}
      <Footer />
    </div>
  );
}
