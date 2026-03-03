import { CustomerLayout } from "@/components/layout/CustomerLayout";

export default function ShippingPolicy() {
  return (
    <CustomerLayout>
      <div className="container max-w-3xl py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Shipping Policy</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Delivery Timelines</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard delivery: <strong>5–7 working days</strong> across India</li>
              <li>Metro cities (Hyderabad, Bangalore, Chennai, Mumbai, Delhi): 3–5 working days</li>
              <li>Remote areas may take 7–10 working days</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Shipping Charges</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free shipping</strong> on all orders above ₹5,000</li>
              <li>Flat ₹150 shipping charge for orders below ₹5,000</li>
              <li>Cash on Delivery (COD) available for select pin codes</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Order Tracking</h2>
            <p>Once your order is shipped, you will receive a tracking number via WhatsApp/SMS. You can also track your order in your account.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Packaging</h2>
            <p>All sarees are carefully folded, wrapped in tissue paper, and placed in a premium gift box to ensure they reach you in perfect condition.</p>
          </section>
        </div>
      </div>
    </CustomerLayout>
  );
}
