import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import BesparingCalculator from '@/components/BesparingCalculator';

export const metadata: Metadata = {
  title: 'Verdura - Duurzame Energie Voor Uw Thuis',
};

// ─── Data ───────────────────────────────────────────────────────────────────

const services = [
  {
    icon: '☀️',
    title: 'Zonnepanelen',
    description:
      'Hoogwaardige zonnepanelen van toonaangevende merken, inclusief installatie en netaansluiting.',
    badge: 'Meest gevraagd',
    badgeColor: 'badge-amber',
    href: '/diensten#zonnepanelen',
  },
  {
    icon: '🔋',
    title: 'Thuisbatterijen',
    description:
      "Sla uw eigen zonne-energie op en gebruik die 's avonds. Volledige energie-onafhankelijkheid.",
    badge: 'Subsidie beschikbaar',
    badgeColor: 'badge-green',
    href: '/diensten#thuisbatterijen',
  },
  {
    icon: '♨️',
    title: 'Warmtepompen',
    description:
      'Efficiënt verwarmen zonder gas. Tot 70% energiebesparing ten opzichte van traditionele cv-ketels.',
    badge: 'Populair',
    badgeColor: 'badge-sky',
    href: '/diensten#warmtepomp',
  },
  {
    icon: '⚡',
    title: 'Laadpalen',
    description:
      'Laad uw elektrische auto slim thuis op. Gecombineerd met zonnepanelen praktisch gratis rijden.',
    badge: 'Nieuw',
    badgeColor: 'badge-green',
    href: '/diensten#laadpaal',
  },
];

const steps = [
  {
    number: '01',
    title: 'Gratis adviesgesprek',
    description: 'We analyseren uw woning en energieverbruik en adviseren het beste pakket.',
  },
  {
    number: '02',
    title: 'Subsidie aanvragen',
    description: 'Wij regelen de gemeentelijke subsidieaanvraag volledig voor u.',
  },
  {
    number: '03',
    title: 'Professionele installatie',
    description: 'Gecertificeerde monteurs installeren alles netjes en op tijd.',
  },
  {
    number: '04',
    title: 'Besparen en genieten',
    description: 'U profiteert direct van lagere energiekosten en een groenere toekomst.',
  },
];

const stats = [
  { value: '1.200+', label: 'Tevreden klanten' },
  { value: '€ 8.400', label: 'Gemiddelde besparing per jaar' },
  { value: '98%', label: 'Klanttevredenheid' },
  { value: '15+', label: 'Jaar ervaring' },
];


// ─── Component ──────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroBgCircle1} />
          <div className={styles.heroBgCircle2} />
          <div className={styles.heroBgCircle3} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className={`badge badge-green animate-fade-up delay-1 ${styles.heroBadge}`}>
              <span>🌱</span>
              <span>Gemeentelijke subsidie beschikbaar</span>
            </div>

            <h1 className={`display-xl animate-fade-up delay-2 ${styles.heroTitle}`}>
              Duurzame energie,{' '}
              <em className={styles.heroTitleAccent}>slimmer wonen.</em>
            </h1>

            <p className={`body-md animate-fade-up delay-3 ${styles.heroSub}`}>
              Verdura installeert zonnepanelen, thuisbatterijen en warmtepompen.
              Profiteer van gemeentelijke subsidies en verlaag uw energierekening structureel.
            </p>

            <div className={`animate-fade-up delay-4 ${styles.heroActions}`}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Gratis adviesgesprek →
              </Link>
              <Link href="/subsidie" className="btn btn-outline btn-lg">
                Bekijk subsidie
              </Link>
            </div>

            <div className={`animate-fade-up delay-5 ${styles.heroTrust}`}>
              <span className={styles.trustDot} />
              <span className={styles.heroTrustText}>
                Gecertificeerd installateur &middot; Meer dan 1.200 woningen verduurzaamd
              </span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <img
              src="https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815918/SLIMME_THERMOSTAAT_zoirlo.png"
              alt="Slimme thermostaat"
              className={styles.heroImage}
            />

            {/* Floating stat cards */}
            <div className={`card ${styles.floatCard} ${styles.floatCardLeft}`}>
              <span className={styles.floatCardIcon}>⚡</span>
              <div>
                <p className={styles.floatCardValue}>€ 142 / maand</p>
                <p className={styles.floatCardLabel}>Gemiddelde besparing</p>
              </div>
            </div>

            <div className={`card ${styles.floatCard} ${styles.floatCardRight}`}>
              <span className={styles.floatCardIcon}>🏅</span>
              <div>
                <p className={styles.floatCardValue}>98% tevreden</p>
                <p className={styles.floatCardLabel}>Klantbeoordeling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <section className={styles.statsBar}>
        <div className={`container ${styles.statsInner}`}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Besparing Calculator ── */}
      <BesparingCalculator />

      {/* ── Subsidie banner ────────────────────────────────────────────── */}
      <section className={`section-sm ${styles.subsidieBanner}`}>
        <div className={`container ${styles.subsidieInner}`}>
          <div className={styles.subsidieText}>
            <span className={`badge badge-amber ${styles.subsidieBadge}`}>
              🏛️ Overheidssubsidie
            </span>
            <h2 className={`display-md ${styles.subsidieTitle}`}>
              Uw gemeente vergoedt tot{' '}
              <span className={styles.subsidieHighlight}>30% van de installatiekosten.</span>
            </h2>
            <p className={`body-md ${styles.subsidieDesc}`}>
              Vanuit de gemeentelijke duurzaamheidspot is er budget voor thuisbatterijen,
              zonnepanelen en warmtepompen. Wij regelen de aanvraag volledig voor u.
            </p>
          </div>
          <Link href="/subsidie" className={`btn btn-amber btn-lg ${styles.subsidieBtn}`}>
            Controleer uw subsidie →
          </Link>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="label-tag" style={{ color: 'var(--green-mid)' }}>
              Onze diensten
            </span>
            <h2 className={`display-lg ${styles.sectionTitle}`}>
              Alles voor een duurzaam thuis
            </h2>
            <p className={`body-lg ${styles.sectionSub}`}>
              Van zonnepanelen tot laadpalen. Wij leveren, installeren en onderhouden
              alles onder één dak.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((svc) => (
              <Link href={svc.href} key={svc.title} className={`card ${styles.serviceCard}`}>
                <div className={styles.serviceIcon}>{svc.icon}</div>
                <div className={styles.serviceBody}>
                  <span className={`badge ${svc.badgeColor}`}>{svc.badge}</span>
                  <h3 className="heading">{svc.title}</h3>
                  <p className={`body-sm ${styles.serviceDesc}`}>{svc.description}</p>
                </div>
                <span className={styles.serviceArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className={`section ${styles.howSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="label-tag" style={{ color: 'var(--amber)' }}>
              Hoe het werkt
            </span>
            <h2 className={`display-lg ${styles.sectionTitle}`}>
              Van advies tot besparing in 4 stappen
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={step.number} className={styles.stepItem}>
                <div className={styles.stepNumber}>{step.number}</div>
                {i < steps.length - 1 && <div className={styles.stepConnector} />}
                <div className={styles.stepContent}>
                  <h3 className={`heading ${styles.stepTitle}`}>{step.title}</h3>
                  <p className={`body-sm ${styles.stepDesc}`}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaBg} aria-hidden="true" />
            <div className={styles.ctaContent}>
              <h2 className={`display-md ${styles.ctaTitle}`}>
                Klaar om te verduurzamen?
              </h2>
              <p className={`body-lg ${styles.ctaSub}`}>
                Vraag een gratis en vrijblijvend adviesgesprek aan.
                Wij komen bij u langs en rekenen alles voor u door.
              </p>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Maak een afspraak →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
