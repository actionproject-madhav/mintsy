export default function Premium() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-7xl font-black tracking-tighter">Go Premium</h1>
        <p className="text-2xl text-gold font-bold uppercase tracking-widest">Maximize your reach on Mintsy</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <ul className="space-y-8">
            {[
              { title: 'Unlimited Featured Listings', desc: 'Get your listings seen first, every time' },
              { title: 'Priority Support', desc: 'Get help faster with dedicated support' },
              { title: 'Advanced Analytics', desc: 'Track views, saves, and engagement on your listings' },
              { title: 'Premium Badge', desc: 'Stand out with a verified premium seller badge' }
            ].map((benefit, i) => (
              <li key={i} className="flex gap-6 items-start">
                <div className="w-2 h-2 mt-2.5 bg-gold rounded-full shrink-0 shadow-[0_0_10px_rgba(255,246,147,0.5)]"></div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{benefit.title}</h3>
                  <p className="text-gray-light leading-relaxed">{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gold/20 via-primary-accent to-primary-dark p-0.5 rounded-xl shadow-2xl">
          <div className="bg-primary-darker rounded-[calc(0.75rem-2px)] p-12 text-center">
            <h2 className="text-2xl font-black mb-2">Monthly Plan</h2>
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-6xl font-black text-gold">$4.99</span>
              <span className="text-gray-light font-bold">/ month</span>
            </div>
            <p className="text-sm text-gray-light mb-12 italic">Billed monthly, cancel anytime</p>
            <button className="btn-gold w-full py-5 text-xl font-black shadow-xl shadow-gold/20">
              Start Premium Membership
            </button>
            <p className="text-xs text-gray-500 mt-8">
              Alternative: Pay $0.99 per featured listing individually
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
