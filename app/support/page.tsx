import Link from 'next/link'
import { Send, Mail, Clock, Truck, ShieldCheck, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Support — GEN+',
  description: 'Contact GEN+ support, read our FAQ, shipping and research-use information.',
}

const channels = [
  {
    Icon: Send,
    title: 'Telegram support',
    text: 'Fastest way to reach us — typically replies in minutes.',
    action: 'Open Telegram',
    href: 'https://t.me/genplus_support',
  },
  {
    Icon: Mail,
    title: 'Email us',
    text: 'For order issues, COAs, and wholesale enquiries.',
    action: 'hello@genplus.bio',
    href: 'mailto:hello@genplus.bio',
  },
]

const info = [
  { Icon: Truck, title: 'Shipping', text: 'Orders dispatch within 24–48h with cold-chain packaging and tracking. An order number is emailed on confirmation.' },
  { Icon: Clock, title: 'Delivery times', text: 'Domestic 2–4 business days, international 5–12 business days depending on customs.' },
  { Icon: RefreshCcw, title: 'Returns', text: 'Unopened items can be returned within 14 days. Damaged or incorrect items are replaced free.' },
  { Icon: ShieldCheck, title: 'Certificates', text: 'A Certificate of Analysis is available for every batch on request via support.' },
]

const faqs = [
  { q: 'What are research peptides used for?', a: 'Our peptides are supplied strictly for in-vitro laboratory and research use. They are not intended for human or veterinary use.' },
  { q: 'How do I reconstitute a peptide?', a: 'Reconstitute the lyophilized powder with bacteriostatic water. Use our peptide calculator to determine exact volumes and syringe units for your target dose.' },
  { q: 'How is purity verified?', a: 'Each batch is independently tested by HPLC and mass spectrometry. Purity ranges from 98.7% to 99.4%, with a Certificate of Analysis available per batch.' },
  { q: 'How should peptides be stored?', a: 'Store lyophilized peptides at -20°C, away from light. Once reconstituted, refrigerate at 2–8°C and use within the recommended window.' },
  { q: 'Will I get an order number?', a: 'Yes — as soon as your order is confirmed, an order number and tracking details are sent to your email.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide with temperature-controlled, discreet packaging. Customs timelines vary by country.' },
]

export default function SupportPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 holo-gradient-animated opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h1 className="text-pretty text-4xl font-black tracking-tight sm:text-5xl">
            How can we <span className="holo-text">help?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Find answers below, or reach our research support team directly. We are
            here to help with orders, dosing, and documentation.
          </p>
        </div>
      </section>

      {/* Contact channels */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {channels.map(({ Icon, title, text, action, href }) => (
            <div key={title} className="flex flex-col rounded-3xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl holo-gradient">
                <Icon className="size-5 text-foreground" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <Button render={<a href={href} target="_blank" rel="noopener noreferrer" />} variant="outline" nativeButton={false} className="mt-4 w-fit rounded-full">
                {action}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Info grid */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-border bg-card p-5">
              <Icon className="size-5 text-muted-foreground" />
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Still have a question? Use the chat in the bottom-right corner.
        </p>
      </section>

      {/* Disclaimer */}
      <section id="disclaimer" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12 pb-20 sm:px-6 lg:px-8 lg:py-20 lg:pb-28">
        <div className="rounded-3xl border border-border bg-secondary/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold">Research use only disclaimer</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            All products sold by GEN+ are intended strictly for in-vitro laboratory
            research and development purposes only. They are not drugs, foods, or
            cosmetics, and may not be used as such. They are not intended for human or
            veterinary use, diagnosis, treatment, or prevention of any disease. By
            purchasing, you confirm you are a qualified researcher or institution.
          </p>
        </div>
      </section>
    </>
  )
}
