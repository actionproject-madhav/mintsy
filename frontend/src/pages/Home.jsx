import { Link } from 'react-router-dom';
import { useLottie } from 'lottie-react';
import GridBackground from '../components/ui/GridBackground';
import AmbientMesh from '../components/ui/AmbientMesh';
import Noise from '../components/ui/Noise';
import { FadeUp, FadeInView, Stagger, StaggerItem } from '../components/ui/motion';
import shieldCheckAnimation from '../assets/lottie/shield-check.json';
import areaMapAnimation from '../assets/lottie/area-map.json';
import discountAnimation from '../assets/lottie/discount.json';
import communityServicesAnimation from '../assets/lottie/community-services.json';
import SpotPricesPanel from '../components/markets/SpotPricesPanel';

function LottieAnimation({ animationData, loop = true }) {
  const { View } = useLottie({ animationData, loop });
  return View;
}

const trust = [
  { key: 'v', animation: shieldCheckAnimation, title: 'Verified sellers', desc: 'Identity-backed profiles and community reputation.' },
  { key: 'l', animation: areaMapAnimation, title: 'Local settlement', desc: 'Coordinate meetups in public, well-lit places.' },
  { key: 'p', animation: discountAnimation, title: 'Transparent pricing', desc: 'Listings anchored to spot and weight where possible.' },
  { key: 'c', animation: communityServicesAnimation, title: 'Built for regions', desc: 'Filters and messaging tuned for nearby trade.' },
];

const steps = [
  { step: '1', title: 'Create account', desc: 'Sign in with Google — fast, no new password.' },
  { step: '2', title: 'Browse or list', desc: 'Search inventory or publish with photos and specs.' },
  { step: '3', title: 'Message & plan', desc: 'Agree on price, time, and a safe public location.' },
  { step: '4', title: 'Meet & exchange', desc: 'Complete the handoff in person, on your terms.' },
];

export default function Home() {
  return (
    <div className="relative">
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0">
          <img
            src="/images/hero/bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.42]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/88 to-zinc-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(255,255,255,0.08),transparent_55%)]" />
        </div>
        <AmbientMesh variant="dark" />
        <GridBackground variant="dark" />
        <Noise opacity={0.07} />

        <div className="container-custom relative z-10 py-28 lg:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUp>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                Local marketplace
              </p>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
                Mintsy
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-4 text-lg font-medium tracking-tight text-zinc-300 md:text-xl">
                Gold, silver, platinum — bought and sold near you
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-zinc-500 md:text-base">
                A calmer way to trade bullion and jewelry: clear listings, direct messaging, and in-person settlement without shipping guesswork.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3">
                <Link
                  to="/marketplace"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-medium text-zinc-950 shadow-sm transition hover:bg-zinc-100"
                >
                  Browse listings
                </Link>
                <Link
                  to="/education"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-8 py-3.5 text-base font-medium text-zinc-100 backdrop-blur-sm transition hover:bg-white/[0.1]"
                >
                  Education &amp; spot context
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/90 bg-zinc-50/80 py-10 md:py-12">
        <div className="container-custom max-w-4xl">
          <SpotPricesPanel variant="compact" />
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="container-custom">
          <FadeInView className="mx-auto mb-14 max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              Why people use it
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Same information density you expect from a serious tool — not a landing-page template.
            </p>
          </FadeInView>

          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {trust.map((item) => (
              <StaggerItem key={item.key}>
                <div className="glass-card flex h-full flex-col p-6 transition hover:border-zinc-300/90">
                  <div className="mx-auto mb-4 h-24 w-24 opacity-[0.92]">
                    <LottieAnimation animationData={item.animation} loop />
                  </div>
                  <h3 className="text-center text-[15px] font-semibold tracking-tight text-zinc-900">{item.title}</h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-zinc-600">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-alt relative border-y border-zinc-200/90">
        <div className="container-custom">
          <FadeInView className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-sm text-zinc-600">From account to handshake in four steps.</p>
          </FadeInView>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((item, i) => (
              <FadeInView key={item.step} delay={i * 0.04} className="glass-card p-6 text-left md:text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-sm font-semibold text-zinc-800 md:mx-auto">
                  {item.step}
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.desc}</p>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="container-custom">
          <FadeInView className="mx-auto max-w-xl text-center">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-12 shadow-soft md:px-12">
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Ready to trade?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                Browse live listings or publish your own. Always meet in public and follow local laws.
              </p>
              <Link
                to="/marketplace"
                className="mt-8 inline-flex rounded-lg bg-white px-10 py-3.5 text-base font-medium text-zinc-950 shadow-sm transition hover:bg-zinc-100"
              >
                Open marketplace
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
