import SpotPricesPanel from '../components/markets/SpotPricesPanel';

export default function Education() {
  return (
    <div className="container-custom max-w-4xl py-12 md:py-16">
      <header className="mb-10 border-b border-zinc-200 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Knowledge center
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Reference spot levels and background on how precious metals are quoted and traded. Nothing here is investment advice.
        </p>
      </header>

      <section className="mb-14" id="spot">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900">Spot reference</h2>
        <SpotPricesPanel variant="full" />
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900">What spot means</h2>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
            <p>
              Spot is the benchmark price for immediate settlement before fabrication, delivery, or dealer margin. It moves with currency, liquidity, and macro conditions.
            </p>
            <p>
              Retail bullion trades at a premium or discount to spot depending on product form, hallmarks, and local supply. Always confirm weight and purity in writing.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500">Practical factors</h3>
            <ul className="mt-4 space-y-4 text-sm text-zinc-600">
              <li>
                <span className="font-medium text-zinc-900">Purity</span>
                <span className="mt-1 block text-zinc-600">
                  Fineness (e.g. .999 for bullion) affects melt value versus jewelry alloys.
                </span>
              </li>
              <li>
                <span className="font-medium text-zinc-900">Weight</span>
                <span className="mt-1 block text-zinc-600">
                  Precious metals are commonly quoted in troy ounces (31.1035 g), not avoirdupois ounces.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-zinc-900">Gold karats (reference)</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: '24K', p: '99.9%', d: 'Pure gold. Common for investment bars and coins.', use: 'Bullion' },
            { k: '18K', p: '75.0%', d: 'High gold content with alloying metals for hardness.', use: 'Fine jewelry' },
            { k: '14K', p: '58.3%', d: 'Widely used in US jewelry; balance of color and durability.', use: 'Daily wear' },
            { k: '10K', p: '41.7%', d: 'Minimum gold content marketed as gold in many US jurisdictions.', use: 'Entry jewelry' },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="font-mono text-lg font-semibold tabular-nums text-zinc-900">{item.k}</div>
              <p className="mt-1 text-xs font-medium text-zinc-500">{item.p} gold</p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600">{item.d}</p>
              <p className="mt-3 text-[11px] text-zinc-400">Typical use: {item.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-zinc-50/80 p-8 md:p-10">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Role in a portfolio</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-600">
          <p>
            Some investors hold physical metal or exchange-listed products for diversification or as a long-duration store of value. Tax treatment and custody vary by jurisdiction.
          </p>
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            <div className="rounded-md border border-zinc-200 bg-white p-5">
              <h3 className="text-sm font-medium text-zinc-900">Inflation and currency</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                Metals can respond differently than equities or bonds when real rates or FX regimes shift. Past behavior does not predict future results.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-5">
              <h3 className="text-sm font-medium text-zinc-900">Physical custody</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                Direct ownership avoids some counterparty paths but introduces storage, insurance, and verification considerations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
