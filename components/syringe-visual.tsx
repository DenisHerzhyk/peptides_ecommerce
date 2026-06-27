'use client'

import { useMemo } from 'react'

interface SyringeVisualProps {
  /** The calculated dose in syringe units */
  unitsPerDose: number
  /** Total capacity of the syringe (default: 100 U) */
  maxUnits?: number
  /** Orientation: vertical (default) or horizontal */
  orientation?: 'vertical' | 'horizontal'
}

export function SyringeVisual({
  unitsPerDose,
  maxUnits = 100,
  orientation = 'vertical',
}: SyringeVisualProps) {
  const fillRatio = useMemo(
    () => Math.min(Math.max(unitsPerDose / maxUnits, 0), 1),
    [unitsPerDose, maxUnits],
  )

  if (orientation === 'horizontal') {
    return (
      <HorizontalSyringe
        fillRatio={fillRatio}
        maxUnits={maxUnits}
        unitsPerDose={unitsPerDose}
      />
    )
  }

  return (
    <VerticalSyringe
      fillRatio={fillRatio}
      maxUnits={maxUnits}
      unitsPerDose={unitsPerDose}
    />
  )
}

// ─── Vertical syringe (original) ─────────────────────────────────────────────

function VerticalSyringe({
  fillRatio,
  maxUnits,
  unitsPerDose,
}: {
  fillRatio: number
  maxUnits: number
  unitsPerDose: number
}) {
  // SVG geometry constants
  const CX = 50
  const BARREL_LEFT = 18
  const BARREL_W = 28
  const BARREL_RIGHT = BARREL_LEFT + BARREL_W
  const BARREL_TOP = 60
  const BARREL_LEN = 152
  const BARREL_BOT = BARREL_TOP + BARREL_LEN
  const PADDING = 12
  const FILL_TOP_OFFSET = 6

  const fillBottom = BARREL_BOT - FILL_TOP_OFFSET
  const fillHeight = (BARREL_LEN - PADDING - FILL_TOP_OFFSET) * fillRatio
  const fillTop = fillBottom - fillHeight
  const stopperY = fillTop - 2

  const graduations = useMemo(() => {
    const marks: { y: number; major: boolean }[] = []
    const step = 10
    for (let u = 0; u <= maxUnits; u += step) {
      const ratio = u / maxUnits
      const y = BARREL_BOT - FILL_TOP_OFFSET - (BARREL_LEN - PADDING - FILL_TOP_OFFSET) * ratio
      marks.push({ y, major: u % (step * 5) === 0 })
    }
    return marks
  }, [maxUnits])

  return (
    <svg
      viewBox="0 0 100 272"
      className="h-full w-auto drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Syringe showing ${Math.round(unitsPerDose)} units of ${maxUnits}`}
      role="img"
    >
      <defs>
        <linearGradient id="fillGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="50%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id="barrelShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
      </defs>

      {/* Needle */}
      <line x1={CX} y1={238} x2={CX} y2={260} className="stroke-muted-foreground/60" strokeWidth={1.5} />
      <polygon points={`${CX},260 ${CX - 2},253 ${CX + 2},253`} className="fill-muted-foreground/60" />
      <path
        d={`M${CX - 6},230 L${CX + 6},230 L${CX + 3},240 L${CX - 3},240 Z`}
        className="fill-muted-foreground/30 stroke-muted-foreground/20"
        strokeWidth={0.5}
      />

      {/* Barrel body */}
      <rect
        x={BARREL_LEFT} y={BARREL_TOP}
        width={BARREL_W} height={BARREL_LEN}
        rx={5}
        className="fill-background/60 stroke-border"
        strokeWidth={1.2}
      />
      <rect
        x={BARREL_LEFT} y={BARREL_TOP}
        width={BARREL_W} height={BARREL_LEN}
        rx={5}
        fill="url(#barrelShine)"
        className="pointer-events-none"
      />

      {/* Fill level */}
      {fillRatio > 0.005 && (
        <rect
          x={BARREL_LEFT + 2}
          y={fillTop}
          width={BARREL_W - 4}
          height={fillHeight}
          rx={2}
          fill="url(#fillGrad)"
          opacity={0.82}
          style={{
            transition: 'y 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      )}

      {/* Graduation marks */}
      {graduations.map(({ y, major }) => (
        <line
          key={`grad-${y.toFixed(0)}`}
          x1={major ? BARREL_LEFT - 2 : BARREL_LEFT + 3}
          y1={y}
          x2={major ? BARREL_LEFT + 10 : BARREL_LEFT + 8}
          y2={y}
          className="stroke-muted-foreground/40"
          strokeWidth={major ? 1.2 : 0.7}
        />
      ))}

      {/* Labels */}
      <text x={BARREL_LEFT + 14} y={BARREL_BOT - 2} className="fill-muted-foreground/50" fontSize={6} fontFamily="ui-monospace, monospace">
        {maxUnits}
      </text>
      <text x={BARREL_LEFT + 14} y={BARREL_TOP + 10} className="fill-muted-foreground/50" fontSize={6} fontFamily="ui-monospace, monospace">
        0
      </text>

      {/* Target-dose indicator */}
      {fillRatio > 0.005 && fillRatio < 0.995 && (
        <line
          x1={BARREL_LEFT - 4} y1={fillTop}
          x2={BARREL_RIGHT + 4} y2={fillTop}
          stroke="#0891b2"
          strokeWidth={2}
          strokeDasharray="4 3"
          opacity={0.75}
          style={{ transition: 'y 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      )}

      {/* Rubber stopper */}
      <rect
        x={BARREL_LEFT - 3} y={stopperY}
        width={BARREL_W + 6} height={6}
        rx={3}
        className="fill-foreground/70"
        style={{ transition: 'y 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />
      <rect
        x={BARREL_LEFT - 1} y={stopperY + 2}
        width={BARREL_W + 2} height={2}
        rx={1}
        className="fill-foreground/40"
        style={{ transition: 'y 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />

      {/* Plunger rod */}
      <rect
        x={CX - 3} y={16}
        width={6} height={stopperY - 16}
        rx={1.5}
        className="fill-muted-foreground/40"
        style={{ transition: 'y 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />

      {/* Thumb press */}
      <circle cx={CX} cy={12} r={9} className="fill-muted-foreground/20 stroke-muted-foreground/40" strokeWidth={1} />
      <circle cx={CX} cy={12} r={5} className="fill-muted-foreground/30" />

      {/* Finger flanges */}
      <rect
        x={BARREL_LEFT - 8} y={BARREL_BOT - 2}
        width={BARREL_W + 16} height={5}
        rx={2.5}
        className="fill-muted-foreground/30 stroke-muted-foreground/20"
        strokeWidth={0.5}
      />
    </svg>
  )
}

// ─── Horizontal syringe ──────────────────────────────────────────────────────

function HorizontalSyringe({
  fillRatio,
  maxUnits,
  unitsPerDose,
}: {
  fillRatio: number
  maxUnits: number
  unitsPerDose: number
}) {
  const SVG_W = 360
  const SVG_H = 120

  // Barrel
  const BARREL_L = 50
  const BARREL_W = 250
  const BARREL_R = BARREL_L + BARREL_W
  const BARREL_T = 40
  const BARREL_H = 40
  const BARREL_B = BARREL_T + BARREL_H

  // Fill
  const FILL_INSET = 3
  const fillW = (BARREL_W - FILL_INSET * 2) * fillRatio
  const fillR = BARREL_L + FILL_INSET + fillW

  // Stopper
  const stopperX = fillR - 4

  // Needle
  const NEEDLE_X = BARREL_R + 6
  const NEEDLE_TIP = BARREL_R + 28
  const NEEDLE_Y = BARREL_T + BARREL_H / 2

  const graduations = useMemo(() => {
    const marks: { x: number; major: boolean }[] = []
    const count = Math.min(maxUnits / 10, 10)
    for (let i = 0; i <= count; i++) {
      const ratio = i / count
      const x = BARREL_L + FILL_INSET + (BARREL_W - FILL_INSET * 2) * ratio
      marks.push({ x, major: i % 5 === 0 })
    }
    return marks
  }, [maxUnits])

  const fmt = (n: number) => String(Math.round(n))

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full h-auto max-h-32 drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Syringe showing ${Math.round(unitsPerDose)} units of ${maxUnits}`}
      role="img"
    >
      <defs>
        <linearGradient id="hFillGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hBarrelShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="80%" stopColor="rgba(0,0,0,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
      </defs>

      {/* Needle */}
      <line x1={NEEDLE_X} y1={NEEDLE_Y} x2={NEEDLE_TIP} y2={NEEDLE_Y} className="stroke-muted-foreground/60" strokeWidth={1.5} />
      <polygon points={`${NEEDLE_TIP},${NEEDLE_Y} ${NEEDLE_TIP - 4},${NEEDLE_Y - 2} ${NEEDLE_TIP - 4},${NEEDLE_Y + 2}`} className="fill-muted-foreground/60" />
      {/* Needle hub */}
      <path
        d={`M${BARREL_R + 2},${BARREL_T + 10} L${BARREL_R + 2},${BARREL_B - 10} L${NEEDLE_X},${BARREL_T + 14} L${NEEDLE_X},${BARREL_B - 14} Z`}
        className="fill-muted-foreground/20 stroke-muted-foreground/20"
        strokeWidth={0.5}
      />

      {/* Barrel body */}
      <rect
        x={BARREL_L} y={BARREL_T}
        width={BARREL_W} height={BARREL_H}
        rx={6}
        className="fill-background/60 stroke-border"
        strokeWidth={1.2}
      />
      <rect
        x={BARREL_L} y={BARREL_T}
        width={BARREL_W} height={BARREL_H}
        rx={6}
        fill="url(#hBarrelShine)"
        className="pointer-events-none"
      />

      {/* Fill level */}
      {fillRatio > 0.005 && (
        <rect
          x={BARREL_L + FILL_INSET}
          y={BARREL_T + FILL_INSET}
          width={fillW}
          height={BARREL_H - FILL_INSET * 2}
          rx={3}
          fill="url(#hFillGrad)"
          opacity={0.82}
          style={{
            transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      )}

      {/* Graduation marks */}
      {graduations.map(({ x, major }) => (
        <line
          key={`h-grad-${x.toFixed(0)}`}
          x1={x}
          y1={major ? BARREL_T - 4 : BARREL_T + 4}
          x2={x}
          y2={major ? BARREL_T + 8 : BARREL_T + 6}
          className="stroke-muted-foreground/50"
          strokeWidth={major ? 1.2 : 0.7}
        />
      ))}

      {/* Labels at ends */}
      <text
        x={BARREL_L + 4}
        y={BARREL_B + 14}
        className="fill-muted-foreground/50"
        fontSize={8}
        fontFamily="ui-monospace, monospace"
      >
        0
      </text>
      <text
        x={BARREL_R - 16}
        y={BARREL_B + 14}
        className="fill-muted-foreground/50"
        fontSize={8}
        fontFamily="ui-monospace, monospace"
      >
        {fmt(maxUnits)}
      </text>

      {/* Dose value label below graduations */}
      <text
        x={BARREL_L + FILL_INSET + fillW / 2}
        y={BARREL_B + 28}
        className="fill-cyan-500"
        fontSize={11}
        fontWeight={700}
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
      >
        {fillRatio > 0 ? `${fmt(unitsPerDose)} u` : ''}
      </text>

      {/* Target-dose indicator */}
      {fillRatio > 0.005 && fillRatio < 0.995 && (
        <line
          x1={fillR} y1={BARREL_T + 2}
          x2={fillR} y2={BARREL_B - 2}
          stroke="#0891b2"
          strokeWidth={2}
          strokeDasharray="4 3"
          opacity={0.75}
          style={{ transition: 'x 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      )}

      {/* Rubber stopper */}
      <rect
        x={stopperX}
        y={BARREL_T - 4}
        width={8}
        height={BARREL_H + 8}
        rx={3}
        className="fill-foreground/60"
        style={{ transition: 'x 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />
      {/* Stopper rib */}
      <rect
        x={stopperX + 1}
        y={BARREL_T + 4}
        width={3}
        height={BARREL_H - 8}
        rx={1}
        className="fill-foreground/30"
        style={{ transition: 'x 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />

      {/* Plunger rod */}
      <rect
        x={10}
        y={BARREL_T + 14}
        width={stopperX - 10}
        height={12}
        rx={3}
        className="fill-muted-foreground/30"
        style={{ transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />

      {/* Thumb press (plunger disc) */}
      <circle cx={12} cy={BARREL_T + BARREL_H / 2} r={10} className="fill-muted-foreground/20 stroke-muted-foreground/40" strokeWidth={1} />
      <circle cx={12} cy={BARREL_T + BARREL_H / 2} r={5} className="fill-muted-foreground/30" />

      {/* Finger flanges */}
      <rect
        x={BARREL_L - 10}
        y={BARREL_T - 4}
        width={8}
        height={BARREL_H + 8}
        rx={3}
        className="fill-muted-foreground/30 stroke-muted-foreground/20"
        strokeWidth={0.5}
      />
      <rect
        x={BARREL_L - 10}
        y={BARREL_B - 8}
        width={8}
        height={BARREL_H / 3}
        rx={2}
        className="fill-muted-foreground/20 stroke-muted-foreground/20"
        strokeWidth={0.5}
      />

      {/* Fill percentage text inside barrel */}
      {fillRatio > 0.02 && (
        <text
          x={BARREL_L + FILL_INSET + fillW / 2}
          y={BARREL_T + BARREL_H / 2 + 0.5}
          className="fill-white/80"
          fontSize={12}
          fontWeight={700}
          fontFamily="ui-monospace, monospace"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {Math.round(fillRatio * 100)}%
        </text>
      )}
    </svg>
  )
}
