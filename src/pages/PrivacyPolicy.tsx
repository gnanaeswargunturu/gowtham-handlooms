import { CustomerLayout } from "@/components/layout/CustomerLayout";

export default function PrivacyPolicy() {
  return (
    <CustomerLayout>
      <div className="container max-w-3xl py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground">
          <p>At Gowtham Handlooms, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email, phone number, delivery address</li>
              <li><strong>Order Information:</strong> Products purchased, order history, payment details</li>
              <li><strong>Usage Data:</strong> Pages visited, time on site, browser type</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and fulfill your orders</li>
              <li>To communicate order updates via WhatsApp/SMS/email</li>
              <li>To improve our products and services</li>
              <li>To send promotional offers (with your consent)</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. Your payment information is never stored on our servers.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Your Rights</h2>
            <p>You can request access to, correction of, or deletion of your personal data by contacting us at info@gowthamhandlooms.com.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Contact</h2>
            <p>For privacy-related queries, email us at <a href="mailto:info@gowthamhandlooms.com" className="text-primary hover:underline">info@gowthamhandlooms.com</a>.</p>
          </section>
        </div>
      </div>
    </CustomerLayout>
  );
}
