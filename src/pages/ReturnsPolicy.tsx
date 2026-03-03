import { CustomerLayout } from "@/components/layout/CustomerLayout";

export default function ReturnsPolicy() {
  return (
    <CustomerLayout>
      <div className="container max-w-3xl py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Returns & Exchanges</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">7-Day Return Policy</h2>
            <p>We want you to be completely satisfied with your purchase. If you're not happy with your saree, you can return or exchange it within <strong>7 days</strong> of delivery.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Conditions for Return</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The saree must be <strong>unused, unwashed, and unaltered</strong></li>
              <li>Original packaging and tags must be intact</li>
              <li>Customized or made-to-order sarees cannot be returned</li>
              <li>Return request must be raised within 7 days of delivery</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact us via WhatsApp (+91 98765 43210) or email</li>
              <li>Share your order number and reason for return</li>
              <li>Our team will arrange a pickup within 2–3 business days</li>
              <li>Refund will be processed within 5–7 business days after we receive the saree</li>
            </ol>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Exchanges</h2>
            <p>If you'd like to exchange your saree for a different one, we'll be happy to help. Exchange is subject to availability of the requested product.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Refund Method</h2>
            <p>Refunds will be processed to the original payment method. For COD orders, refund will be made via bank transfer.</p>
          </section>
        </div>
      </div>
    </CustomerLayout>
  );
}
