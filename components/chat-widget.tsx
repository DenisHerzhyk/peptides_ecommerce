'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Msg = { from: 'bot' | 'user'; text: string }

const TELEGRAM_SUPPORT = 'https://t.me/genplus_support'

const quickQuestions = [
  'What are research peptides?',
  'How do I reconstitute a peptide?',
  'How is purity tested?',
  'What is your shipping time?',
]

const knowledge: Record<string, string> = {
  'what are research peptides':
    'Research peptides are short chains of amino acids supplied strictly for in-vitro laboratory and research use. All GEN+ products are lyophilized powders intended for research only — not for human or veterinary use.',
  'how do i reconstitute a peptide':
    'Reconstitution is typically done with bacteriostatic water. Use our Peptide Calculator to get exact volumes for your target dose, vial size, and syringe units.',
  'how is purity tested':
    'Every batch is third-party tested via HPLC and mass spectrometry. Certificates of Analysis (COA) are available per batch — purity ranges from 98.7% to 99.4%.',
  'what is your shipping time':
    'Orders ship within 24–48h on business days with cold-chain packaging. Tracking and an order number are emailed as soon as your order is confirmed.',
}

function answer(input: string): string {
  const q = input.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()
  for (const key of Object.keys(knowledge)) {
    if (q.includes(key) || key.includes(q)) return knowledge[key]
  }
  if (q.includes('price') || q.includes('cost'))
    return 'Pricing depends on the peptide and vial size. Browse the Catalog for per-vial pricing, or check our Bundles for discounted research stacks.'
  if (q.includes('dose') || q.includes('calculator'))
    return 'Our Peptide Calculator gives you exact reconstitution volumes and per-injection units. You can find it in the top navigation.'
  return "I can help with general questions about peptides, reconstitution, purity, and shipping. For order-specific help, tap “Chat with support on Telegram” below and our team will assist you directly."
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: 'bot',
      text: "Hi! I'm the GEN+ assistant. Ask me about peptides, dosing, purity, or shipping.",
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { from: 'user', text: trimmed }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: answer(trimmed) }])
    }, 450)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          {/* header */}
          <div className="relative shrink-0 overflow-hidden p-4">
            <div className="absolute inset-0 holo-gradient opacity-90" aria-hidden />
            <div className="relative flex items-center justify-between text-foreground">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-background/70 backdrop-blur">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight">GEN+ Assistant</p>
                  <p className="text-xs text-foreground/70">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex size-8 items-center justify-center rounded-full bg-background/60 backdrop-blur hover:bg-background/80"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-background/40 p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === 'user'
                    ? 'ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground'
                    : 'mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2 text-sm text-secondary-foreground'
                }
              >
                {m.text}
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* support link */}
          <a
            href={TELEGRAM_SUPPORT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center gap-2 border-t border-border bg-secondary/60 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Send className="size-3.5" />
            Chat with support on Telegram
            <ExternalLink className="size-3" />
          </a>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex shrink-0 items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="min-w-0 flex-1 rounded-full bg-secondary px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" size="icon" className="rounded-full" aria-label="Send">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full border border-border bg-card py-2.5 pl-3 pr-4 shadow-xl transition-transform hover:scale-[1.03]"
        aria-label="Open FAQ and support chat"
      >
        <span className="flex size-8 items-center justify-center rounded-full holo-gradient">
          <MessageCircle className="size-4 text-foreground" />
        </span>
        <span className="text-sm font-semibold">
          {open ? 'Close chat' : 'Want to ask a question?'}
        </span>
      </button>
    </div>
  )
}
