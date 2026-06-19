'use client'

import { useMemo, useState } from 'react'
import { Calculator, Syringe, Droplet, FlaskConical } from 'lucide-react'
import { Label } from '@/components/ui/label'

function NumberField({
  id,
  label,
  unit,
  value,
  onChange,
  step = 1,
  min = 0,
}: {
  id: string
  label: string
  unit: string
  value: number
  onChange: (n: number) => void
  step?: number
  min?: number
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-ring">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none"
        />
        <span className="px-3 text-xs font-medium text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}

export function CalculatorClient() {
  const [peptideMg, setPeptideMg] = useState(10) // vial size in mg
  const [waterMl, setWaterMl] = useState(2) // bacteriostatic water in mL
  const [doseMcg, setDoseMcg] = useState(250) // desired dose in mcg
  const [syringeUnits, setSyringeUnits] = useState(100) // units per mL (U-100)

  const results = useMemo(() => {
    const totalMcg = peptideMg * 1000
    const concentrationMcgPerMl = waterMl > 0 ? totalMcg / waterMl : 0 // mcg per mL
    const mlPerDose = concentrationMcgPerMl > 0 ? doseMcg / concentrationMcgPerMl : 0
    const unitsPerDose = mlPerDose * syringeUnits
    const dosesPerVial = doseMcg > 0 ? totalMcg / doseMcg : 0
    return {
      concentrationMcgPerMl,
      mlPerDose,
      unitsPerDose,
      dosesPerVial,
    }
  }, [peptideMg, waterMl, doseMcg, syringeUnits])

  const fmt = (n: number, d = 2) =>
    Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: d }) : '—'

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 holo-gradient-animated opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <Calculator className="size-3.5" /> Research dosing tool
          </span>
          <h1 className="mt-5 text-pretty text-4xl font-black tracking-tight sm:text-5xl">
            Peptide <span className="holo-text">calculator</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Calculate exact reconstitution volumes and syringe units for your research
            protocol. Enter your vial size, water volume, and target dose.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-lg font-bold">Your inputs</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <NumberField id="vial" label="Peptide in vial" unit="mg" value={peptideMg} onChange={setPeptideMg} step={1} />
              <NumberField id="water" label="Bacteriostatic water" unit="mL" value={waterMl} onChange={setWaterMl} step={0.5} />
              <NumberField id="dose" label="Desired dose" unit="mcg" value={doseMcg} onChange={setDoseMcg} step={50} />
              <NumberField id="syringe" label="Syringe scale" unit="U/mL" value={syringeUnits} onChange={setSyringeUnits} step={10} />
            </div>
            <p className="mt-6 rounded-xl bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
              Standard insulin syringes are U-100 (100 units = 1 mL). For research use
              only — always follow your laboratory protocol.
            </p>
          </div>

          {/* Results */}
          <div className="relative overflow-hidden rounded-3xl border border-border p-6 sm:p-8">
            <div className="absolute inset-0 holo-gradient opacity-30" aria-hidden />
            <div className="relative">
              <h2 className="text-lg font-bold">Results</h2>

              <div className="mt-6 rounded-2xl border border-border bg-background/80 p-6 text-center backdrop-blur">
                <p className="text-sm text-muted-foreground">Draw to this mark</p>
                <p className="mt-1 text-5xl font-black tracking-tight">
                  {fmt(results.unitsPerDose, 1)}
                  <span className="ml-2 text-2xl text-muted-foreground">units</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  = {fmt(results.mlPerDose, 3)} mL per dose
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { Icon: Droplet, label: 'Concentration', value: `${fmt(results.concentrationMcgPerMl, 0)} mcg/mL` },
                  { Icon: Syringe, label: 'Volume / dose', value: `${fmt(results.mlPerDose, 3)} mL` },
                  { Icon: FlaskConical, label: 'Doses / vial', value: fmt(results.dosesPerVial, 0) },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-border bg-background/80 p-4 backdrop-blur">
                    <Icon className="size-4 text-muted-foreground" />
                    <p className="mt-2 text-xs text-muted-foreground">{label}</p>
                    <p className="text-base font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
