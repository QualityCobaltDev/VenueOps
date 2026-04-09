export default function VenueOpsLandingPage() {
  const pains = [
    'Opening tasks get missed during busy shifts',
    'Closing checks are skipped or rushed',
    'Incident reporting is inconsistent and incomplete',
    'Managers rely on paper notes and WhatsApp',
    'Shift handovers lose context and accountability',
    'Small operational failures become expensive fast',
  ];

  const features = [
    {
      title: 'Daily Checklists',
      description:
        'Standardize opening, mid-shift, and closing workflows so nothing gets missed when the venue gets busy.',
      points: ['Role-based checklists', 'Completion tracking', 'Clear accountability'],
    },
    {
      title: 'Incident Reports',
      description:
        'Capture issues properly in real time with structured reporting your management team can actually review.',
      points: ['Fast logging', 'Centralized records', 'Consistent documentation'],
    },
    {
      title: 'Manager Logs',
      description:
        'Create clean, searchable handovers between shifts so your team always knows what happened and what matters next.',
      points: ['Shift notes', 'Priority handovers', 'Operational visibility'],
    },
  ];

  const pricingItems = [
    'Unlimited core operations usage',
    'One venue included',
    'Daily checklists',
    'Incident reports',
    'Manager logs',
    'Ready-to-use templates',
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#020817] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-[26rem] w-[26rem] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
              <div className="h-4 w-4 rounded-md bg-gradient-to-br from-violet-400 to-cyan-300" />
            </div>
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-white/60">Venue Ops</div>
              <div className="text-xs text-white/40">Venue operations system</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#problems" className="text-sm text-white/70 transition hover:text-white">
              Problems
            </a>
            <a href="#features" className="text-sm text-white/70 transition hover:text-white">
              Features
            </a>
            <a href="#preview" className="text-sm text-white/70 transition hover:text-white">
              Preview
            </a>
            <a href="#pricing" className="text-sm text-white/70 transition hover:text-white">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,0.18)] transition hover:translate-y-[-1px]"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-violet-200">
              Built for bars, restaurants, and nightlife teams
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Stop Losing Money to
              <span className="block bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                Poor Venue Operations
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              Run checklists, incident reports, and manager handovers in one clean system built to reduce operational
              leakage and keep every shift accountable.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,0.18)] transition hover:translate-y-[-2px]"
              >
                Start Free 7-Day Trial
              </a>
              <a
                href="#preview"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-white/20 hover:bg-white/10"
              >
                View Product Preview
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['No missed tasks', 'Structured opening and closing workflows'],
                ['Clear handovers', 'Managers always know what happened'],
                ['Better accountability', 'Every action tracked in one place'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/55">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="preview" className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-cyan-400/10 to-transparent blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#071120] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-sm font-medium text-white/60">Tonight’s Operations</div>
                    <div className="mt-1 text-xl font-semibold text-white">Main Floor — Friday Service</div>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    Live
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white">Opening Checklist</div>
                        <div className="text-xs text-white/45">Assigned to floor manager</div>
                      </div>
                      <div className="text-sm font-semibold text-cyan-200">8/10</div>
                    </div>
                    <div className="space-y-3 text-sm text-white/80">
                      {([
                        [true, 'Till float counted and confirmed'],
                        [true, 'Ice wells stocked'],
                        [true, 'Bar stations set'],
                        [true, 'Glassware polish complete'],
                        [false, 'Bathroom check signed off'],
                        [false, 'Security briefing logged'],
                      ] as Array<[boolean, string]>).map(([done, item]) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2"
                        >
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                              done
                                ? 'border-emerald-400/30 bg-emerald-400/15 text-emerald-200'
                                : 'border-white/10 bg-white/5 text-white/40'
                            }`}
                          >
                            {done ? '✓' : ''}
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-medium text-white">Incident Report</div>
                          <div className="mt-1 text-xs text-white/45">Logged 11:24 PM</div>
                        </div>
                        <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                          Requires review
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/70">
                        Guest slip near rear service corridor. Area isolated, cleaned, and documented. CCTV reference
                        attached for manager review.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="mb-3 text-sm font-medium text-white">Manager Handover</div>
                      <div className="space-y-3 text-sm text-white/70">
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                          VIP table 12 comp approved by GM. Watch remaining tab adjustments.
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                          Back bar stock low on tequila. Recount before tomorrow open.
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                          New door procedure briefed. Security sign-off still outstanding.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problems" className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-violet-200/80">The real problem</div>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Most venues are not losing money in one big way.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                They lose it through repeated operational failures, inconsistent processes, and poor visibility between
                shifts.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {pains.map((pain) => (
                <div
                  key={pain}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 backdrop-blur-xl"
                >
                  <div className="mb-4 h-10 w-10 rounded-xl border border-rose-400/20 bg-rose-400/10" />
                  <p className="text-base leading-7 text-white/80">{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Core system</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              One operating system for the parts of venue management that usually fall apart.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/65 sm:text-lg">
              Structured where it matters. Fast where it needs to be. Designed for real-world service pressure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-400/20 to-cyan-300/10 text-lg font-semibold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/65">{feature.description}</p>
                <div className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm text-white/75">
                      <div className="h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8 lg:py-12">
          <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-violet-200/80">Why it works</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">
                Built for real operators, not theoretical workflows.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Faster execution', 'Teams know exactly what needs to happen.'],
                ['Better visibility', 'Managers get one source of truth across shifts.'],
                ['Less leakage', 'Small failures stop compounding into bigger losses.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-[#071120]/80 p-5">
                  <div className="text-lg font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">Pricing</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Simple pricing for venues that need control.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                One venue. Unlimited core operations usage. No bloated setup. No unnecessary complexity.
              </p>
            </div>

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-2xl lg:p-10">
              <div className="absolute right-6 top-6 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-200">
                Early access plan
              </div>
              <div className="text-sm font-medium text-white/50">Starting at</div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-6xl font-semibold tracking-[-0.05em] text-white">$99</div>
                <div className="pb-2 text-lg text-white/55">/ month</div>
              </div>

              <div className="mt-8 grid gap-3">
                {pricingItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#071120]/80 px-4 py-3 text-sm text-white/80"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-xs text-emerald-200">
                      ✓
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,0.18)] transition hover:translate-y-[-2px]"
                >
                  Start 7-Day Trial
                </a>
                <a
                  href="#preview"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Review Preview
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-violet-500/15 via-white/[0.05] to-cyan-400/10 px-8 py-12 shadow-2xl backdrop-blur-2xl lg:px-12 lg:py-16">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative mx-auto max-w-4xl text-center">
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-white/60">Final call</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Fix operational leakage before it costs you more.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Replace scattered notes, missed checks, and inconsistent reporting with one premium system your managers
                can actually run with.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,0.18)] transition hover:translate-y-[-2px]"
                >
                  Start Free Trial
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
