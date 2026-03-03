import { CustomerLayout } from "@/components/layout/CustomerLayout";

export default function Terms() {
  return (
    <CustomerLayout>
      <div className="container max-w-3xl py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground">
          <p>By using the Gowtham Handlooms website and placing orders, you agree to the following terms and conditions.</p>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Products</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All products are handloom sarees and may have minor variations in color, weave, and pattern – this is characteristic of handmade products</li>
              <li>Product images are representative; actual colors may vary slightly due to screen settings</li>
              <li>Prices are in Indian Rupees (INR) and inclusive of applicable taxes</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Orders</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are confirmed once payment is received or COD is selected</li>
              <li>We reserve the right to cancel orders if products are out of stock</li>
              <li>Order modifications are accepted only before shipping</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Payment</h2>
            <p>We accept UPI, bank transfer, and Cash on Delivery (COD). Online payment gateway integration is coming soon.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Intellectual Property</h2>
            <p>All content, images, and designs on this website are the property of Gowtham Handlooms and may not be reproduced without permission.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Andhra Pradesh.</p>
          </section>
        </div>
      </div>
    </CustomerLayout>
  );
}
