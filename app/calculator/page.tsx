import { CalculatorClient } from './calculator-client'

export const metadata = {
  title: 'Peptide Calculator — HELIXA',
  description: 'Calculate exact reconstitution volumes and syringe units for your research protocol.',
}

export default function CalculatorPage() {
  return <CalculatorClient />
}
