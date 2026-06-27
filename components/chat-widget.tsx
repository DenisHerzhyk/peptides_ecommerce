'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, ExternalLink, ChevronDown } from 'lucide-react'

const TELEGRAM_SUPPORT = 'https://t.me/genplus_support'

const faqs = [
  {
    q: 'What are research peptides?',
    a: 'Research peptides are short chains of amino acids supplied strictly for in-vitro laboratory and research use. All GEN+ products are lyophilized powders intended for research only — not for human or veterinary use.',
  },
  {
    q: 'How do I reconstitute a peptide?',
    a: 'Reconstitution is typically done with bacteriostatic water. Use our Peptide Calculator to get exact volumes for your target dose, vial size, and syringe units.',
  },
  {
    q: 'How is purity tested?',
    a: 'Every batch is third-party tested via HPLC and mass spectrometry. Certificates of Analysis (COA) are available per batch — purity ranges from 98.7% to 99.4%.',
  },
  {
    q: 'What is your shipping time?',
    a: 'Orders ship within 24–48h on business days with cold-chain packaging. Tracking and an order number are emailed as soon as your order is confirmed.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — we ship worldwide with temperature-controlled, discreet packaging. Customs timelines vary by country.',
  },
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="flex max-h-[32rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden p-4">
            <div className="absolute inset-0 holo-gradient opacity-90" aria-hidden />
            <div className="relative flex items-center justify-between text-foreground">
              <div>
                <p className="text-sm font-bold leading-tight">Help &amp; FAQ</p>
                <p className="text-xs text-foreground/70">Quick answers and support</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex size-8 items-center justify-center rounded-full bg-background/60 backdrop-blur hover:bg-background/80"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* FAQ list */}
          <div className="flex-1 overflow-y-auto bg-background/40 p-3">
            <ul className="flex flex-col gap-1.5">
              {faqs.map((faq, i) => (
                <li key={i} className="overflow-hidden rounded-2xl border border-border">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex w-full items-center justify-between gap-2 bg-card px-3.5 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary/60"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                        expanded === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expanded === i && (
                    <div className="border-t border-border px-3.5 py-2.5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Telegram support link */}
          <a
            href={TELEGRAM_SUPPORT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center gap-2 border-t border-border bg-secondary/60 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Send className="size-4" />
            Chat with support on Telegram
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full border border-border bg-card py-2.5 pl-3 pr-4 shadow-xl transition-transform hover:scale-[1.03]"
        aria-label="Open help and FAQ"
      >
        <span className="flex size-8 items-center justify-center rounded-full holo-gradient">
          <MessageCircle className="size-4 text-foreground" />
        </span>
        <span className="text-sm font-semibold">
          {open ? 'Close' : 'Help & FAQ'}
        </span>
      </button>
    </div>
  )
}
