import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What are the shipping charges and delivery times?",
    a: "We offer free shipping on orders above ₹5,000. For orders below ₹5,000, a flat shipping charge of ₹150 applies. Delivery typically takes 5–7 working days across India.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes, we offer Cash on Delivery for most pin codes across India. COD availability will be confirmed during checkout. A small COD charge may apply.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We offer a 7-day hassle-free return/exchange policy. The saree must be unused, unwashed, and in its original packaging with all tags intact. Customized or altered sarees cannot be returned.",
  },
  {
    q: "How do you ensure the authenticity of your sarees?",
    a: "All our sarees are 100% genuine handloom products, sourced directly from verified artisan families in Chirala and surrounding regions of Andhra Pradesh. Each saree comes with an authenticity guarantee. We never deal in powerloom products.",
  },
  {
    q: "How should I care for my silk saree?",
    a: "For silk sarees, we recommend dry cleaning only. Store in a cool, dry place wrapped in muslin cloth. Avoid direct sunlight for extended periods. For cotton sarees, gentle hand wash in cold water is recommended.",
  },
  {
    q: "How should I care for my cotton saree?",
    a: "Cotton sarees can be hand washed in cold water with mild detergent. Avoid wringing. Dry in shade and iron on medium heat. First wash separately as slight color bleeding may occur.",
  },
  {
    q: "Can I order a saree via WhatsApp?",
    a: "Absolutely! You can browse our collection and place orders directly via WhatsApp. Just message us at +91 98765 43210 with the saree name or photo, and we'll guide you through the ordering process.",
  },
  {
    q: "Do your sarees come with a blouse piece?",
    a: "Most of our sarees come with a matching blouse piece (0.8m–1m). The product description for each saree clearly mentions whether a blouse piece is included.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order is shipped, you will receive a tracking link via WhatsApp/SMS. You can also check your order status in your account under 'My Orders'.",
  },
];

export default function FAQ() {
  return (
    <CustomerLayout>
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about ordering from Gowtham Handlooms
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border bg-card px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </CustomerLayout>
  );
}
