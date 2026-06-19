'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, Check, Truck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/components/cart-store'

type Step = 'cart' | 'ship' | 'done'

function genOrderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `HLX-${n}`
}

export function CartClient() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart()
  const [step, setStep] = useState<Step>('cart')
  const [email, setEmail] = useState('')
  const [orderNo, setOrderNo] = useState('')

  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15
  const total = subtotal + shipping

  function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    setOrderNo(genOrderNumber())
    setStep('done')
    clear()
  }

  if (step === 'done') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full holo-gradient">
          <Check className="size-8 text-foreground" />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight">Order confirmed</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your order. A confirmation with your order number has been sent to{' '}
          <span className="font-medium text-foreground">{email || 'your email'}</span>.
        </p>
        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Your order number</p>
          <p className="holo-text mt-1 text-4xl font-black tracking-tight">{orderNo}</p>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Truck className="size-4" /> Ships within 24–48h with tracking
          </p>
        </div>
        <Button asChild size="lg" className="mt-8 rounded-full">
          <Link href="/catalog">Continue shopping</Link>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-7 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Browse our research peptides to get started.</p>
        <Button asChild size="lg" className="mt-8 rounded-full">
          <Link href="/catalog">Explore catalog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
        {step === 'cart' ? 'Your cart' : 'Shipping & payment'}
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {step === 'cart' ? (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                    <Image src={item.image || '/placeholder.svg'} alt={item.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold leading-tight">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.variant}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="flex size-8 items-center justify-center rounded-full hover:bg-secondary" aria-label="Decrease">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="flex size-8 items-center justify-center rounded-full hover:bg-secondary" aria-label="Increase">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-bold">${item.price * item.qty}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <form id="ship-form" onSubmit={placeOrder} className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">Contact & shipping</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email (for order confirmation)</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lab.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="first">First name</Label>
                  <Input id="first" required placeholder="Alex" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="last">Last name</Label>
                  <Input id="last" required placeholder="Mercer" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="addr">Address</Label>
                  <Input id="addr" required placeholder="123 Research Ave" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="Tallinn" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="zip">Postal code</Label>
                  <Input id="zip" required placeholder="10115" className="mt-1.5" />
                </div>
              </div>

              <h2 className="mt-8 text-lg font-bold">Payment</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="card">Card number</Label>
                  <Input id="card" required inputMode="numeric" placeholder="4242 4242 4242 4242" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="exp">Expiry</Label>
                  <Input id="exp" required placeholder="MM/YY" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" required inputMode="numeric" placeholder="123" className="mt-1.5" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                This is a design demo — no real payment is processed.
              </p>
            </form>
          )}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-20">
          <h2 className="text-lg font-bold">Order summary</h2>
          <dl className="mt-5 flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">${subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? 'Free' : `$${shipping}`}</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-bold">Total</dt>
              <dd className="font-black">${total}</dd>
            </div>
          </dl>

          {step === 'cart' ? (
            <Button onClick={() => setStep('ship')} size="lg" className="mt-6 w-full rounded-full">
              Checkout <ArrowRight className="size-4" />
            </Button>
          ) : (
            <>
              <Button type="submit" form="ship-form" size="lg" className="mt-6 w-full rounded-full">
                Place order
              </Button>
              <button onClick={() => setStep('cart')} className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground">
                Back to cart
              </button>
            </>
          )}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Free shipping on orders over $200
          </p>
        </aside>
      </div>
    </div>
  )
}
