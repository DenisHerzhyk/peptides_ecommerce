'use client'

import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
import { SyringeVisual } from '@/components/syringe-visual'

const syringeTypes = [
  { label: '0.3ml', units: 30 },
  { label: '0.5ml', units: 50 },
  { label: '1.0ml', units: 100 },
] as const

const vialOptions = [5, 10, 15] as const
const waterOptions = [1, 2, 3] as const
const doseOptions = [50, 100, 250, 500, 1000] as const

type SyringeLabel = (typeof syringeTypes)[number]['label']

export function CalculatorClient() {
  const [syringeLabel, setSyringeLabel] = useState<SyringeLabel>('1.0ml')
  const [peptideMg, setPeptideMg] = useState(5)
  const [waterMl, setWaterMl] = useState(1)
  const [doseMcg, setDoseMcg] = useState<number | null>(null)

  const selectedSyringe = syringeTypes.find((s) => s.label === syringeLabel)!

  const results = useMemo(() => {
    if (!doseMcg) return null
    const totalMcg = peptideMg * 1000
    const concentration = waterMl > 0 ? totalMcg / waterMl : 0
    const mlPerDose = concentration > 0 ? doseMcg / concentration : 0
    const unitsPerDose = mlPerDose * 100 // U-100: 100 units per 1 mL
    const dosesPerVial = doseMcg > 0 ? totalMcg / doseMcg : 0
    return { concentration, mlPerDose, unitsPerDose, dosesPerVial }
  }, [peptideMg, waterMl, doseMcg, selectedSyringe])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 holo-gradient-animated opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <Calculator className="size-3.5" /> Research dosing tool
          </span>
          <h1 className="mt-5 text-pretty text-4xl font-black tracking-tight sm:text-5xl">
            Peptide <span className="holo-text">calculator</span>
          </h1>
          <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
            Select your vial, water, and target dose — we&apos;ll show exactly where
            to draw on your syringe.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 lg:px-8 lg:py-20 lg:pb-28">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8 lg:p-10">
          {/* 1. Syringe type */}
          <div>
            <h2 className="text-base font-bold">What is the total volume of your syringe?</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {syringeTypes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSyringeLabel(s.label)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                    syringeLabel === s.label
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-sm'
                      : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {s.label} ({s.units} units)
                </button>
              ))}
            </div>
          </div>

          {/* 2. Two columns */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Peptide vial quantity */}
            <div>
              <h2 className="text-base font-bold">What is your peptide vial quantity?</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {vialOptions.map((mg) => (
                  <button
                    key={mg}
                    onClick={() => setPeptideMg(mg)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                      peptideMg === mg
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-sm'
                        : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                    }`}
                  >
                    {mg}mg
                  </button>
                ))}
              </div>
            </div>

            {/* Bacteriostatic water */}
            <div>
              <h2 className="text-base font-bold">How much bacteriostatic water are you adding?</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {waterOptions.map((ml) => (
                  <button
                    key={ml}
                    onClick={() => setWaterMl(ml)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                      waterMl === ml
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-sm'
                        : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                    }`}
                  >
                    {ml}ml
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Dose selection */}
          <div className="mt-8">
            <h2 className="text-base font-bold">What is the dose?</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {doseOptions.map((mcg) => (
                <button
                  key={mcg}
                  onClick={() => setDoseMcg(mcg)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                    doseMcg === mcg
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-sm'
                      : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {mcg >= 1000 ? `${mcg / 1000}mg` : `${mcg} mcg`}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Syringe visual (always visible) */}
          <div className="mt-10">
            {/* Dose info block */}
            {doseMcg !== null && results && (
              <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-center">
                <p className="text-sm text-muted-foreground">
                  For a dose of{' '}
                  <span className="font-bold text-foreground">
                    {doseMcg >= 1000 ? `${doseMcg / 1000} mg` : `${doseMcg} mcg`}
                  </span>
                  , pull the syringe to{' '}
                  <span className="font-bold text-foreground">
                    {results.unitsPerDose.toFixed(1)} units
                  </span>
                </p>
              </div>
            )}

            {/* Horizontal syringe */}
            <div className={`rounded-2xl border ${doseMcg !== null ? 'mt-5 border-border bg-background/80' : 'border-dashed border-border/60 bg-secondary/20'} p-4 backdrop-blur`}>
              <div className="flex items-center justify-center">
                <SyringeVisual
                  unitsPerDose={doseMcg !== null && results ? results.unitsPerDose : 0}
                  maxUnits={selectedSyringe.units}
                  orientation="horizontal"
                />
              </div>
            </div>

            {/* Stats row */}
            {doseMcg !== null && results && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: 'Concentration',
                    value: `${results.concentration.toFixed(0)} mcg/mL`,
                  },
                  {
                    label: 'Volume / dose',
                    value: `${results.mlPerDose.toFixed(3)} mL`,
                  },
                  {
                    label: 'Doses / vial',
                    value: String(Math.floor(results.dosesPerVial)),
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-background/60 p-3 text-center"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-0.5 text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Research use disclaimer */}
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
