'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ons-team.module.css';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const teamleden = [
  {
    naam: 'Voornaam Achternaam',
    rol: 'Oprichter & Energieadviseur',
    bio: 'Met jarenlange ervaring in de duurzame energiesector helpt hij woningeigenaren de juiste keuzes te maken. Hij gelooft in persoonlijk advies zonder druk.',
    email: 'voornaam@verdura.nl',
    tags: ['Warmtepompen', 'Zonnepanelen', 'Subsidies'],
    initialen: 'VN',
    kleur: 'groen',
  },
  {
    naam: 'Voornaam Achternaam',
    rol: 'Installatiecoördinator',
    bio: 'Zij zorgt dat elke installatie vlekkeloos verloopt. Van planning tot oplevering houdt ze het overzicht en houdt de klant op de hoogte.',
    email: 'voornaam@verdura.nl',
    tags: ['Planning', 'Kwaliteitscontrole', 'Laadpalen'],
    initialen: 'VN',
    kleur: 'amber',
  },
  {
    naam: 'Voornaam Achternaam',
    rol: 'Subsidiespecialist',
    bio: 'Hij kent de subsidieregelingen op zijn duim en zorgt dat klanten maximaal gebruikmaken van alle beschikbare tegemoetkomingen van de overheid.',
    email: 'voornaam@verdura.nl',
    tags: ['ISDE', 'BTW-regelingen', 'Gemeente subsidies'],
    initialen: 'VN',
    kleur: 'blauw',
  },
  {
    naam: 'Voornaam Achternaam',
    rol: 'Technisch Adviseur',
    bio: 'Als technisch specialist beoordeelt zij woningen op verduurzamingspotentieel en stelt installatieplannen op die aansluiten bij de specifieke situatie.',
    email: 'voornaam@verdura.nl',
    tags: ['Thuisbatterijen', 'Warmtepompen', 'Technisch advies'],
    initialen: 'VN',
    kleur: 'licht',
  },
];

const waarden = [
  {
    icon: '🌱',
    titel: 'Persoonlijk advies',
    tekst: 'Geen scripts, geen verkooppraatjes. Wij luisteren naar jouw situatie en geven eerlijk advies, ook als dat betekent dat een bepaalde maatregel voor jou nog niet loont.',
  },
  {
    icon: '🔍',
    titel: 'Transparantie',
    tekst: 'Je weet altijd precies wat je betaalt, welke subsidies je ontvangt en wat de verwachte terugverdientijd is. Geen verborgen kosten, geen verrassingen achteraf.',
  },
  {
    icon: '🤝',
    titel: 'Vaste begeleiding',
    tekst: 'Van het eerste gesprek tot na de installatie heb je één vast aanspreekpunt. Wij blijven beschikbaar voor vragen, ook als de installatie al achter de rug is.',
  },
  {
    icon: '⚡',
    titel: 'Kwaliteit eerste',
    tekst: 'We werken uitsluitend met gecertificeerde installateurs en producten van bewezen kwaliteit. Snelle levering ten koste van kwaliteit is bij ons geen optie.',
  },
];

function TeamKaart({ lid, index }: { lid: typeof teamleden[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.teamKaart} ${styles[`kaart_${lid.kleur}`]} ${inView ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={styles.kaartTop}>
        <div className={`${styles.avatar} ${styles[`avatar_${lid.kleur}`]}`}>
          <span className={styles.avatarInitialen}>{lid.initialen}</span>
          <div className={styles.avatarPlaceholder}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="14" r="7" fill="currentColor" fillOpacity="0.3" />
              <path d="M4 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className={styles.kaartMeta}>
          <h3 className={styles.kaartNaam}>{lid.naam}</h3>
          <p className={styles.kaartRol}>{lid.rol}</p>
        </div>
      </div>
      <p className={styles.kaartBio}>{lid.bio}</p>
      <div className={styles.kaartTags}>
        {lid.tags.map((tag) => (
          <span key={tag} className={`${styles.tag} ${styles[`tag_${lid.kleur}`]}`}>{tag}</span>
        ))}
      </div>
      <a href={`mailto:${lid.email}`} className={styles.kaartEmail}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {lid.email}
      </a>
    </div>
  );
}

function WaardeKaart({ waarde, index }: { waarde: typeof waarden[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.waardeKaart} ${inView ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className={styles.waardeIcon}>{waarde.icon}</span>
      <h3 className={styles.waardeTitel}>{waarde.titel}</h3>
      <p className={styles.waardeTekst}>{waarde.tekst}</p>
    </div>
  );
}

export default function OnsTeamPage() {
  return (
    <main className={styles.main}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <img
          src="https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815916/MONSTERA_BLADEREN_dbhaeb.png"
          alt=""
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.heroGlassWrap}>
            <div className={styles.heroGlass}>
              <span className={styles.heroLabel}>Over Verdura</span>
              <h1 className={styles.heroTitel}>
                Mensen die{' '}
                <span className={styles.heroAccent}>geloven</span>{' '}<br />
                in wat ze doen
              </h1>
              <p className={styles.heroSubtitel}>
                Verdura is opgericht vanuit een eenvoudige overtuiging: verduurzamen moet eerlijk, persoonlijk en zonder gedoe zijn. Ons team begeleidt je van het eerste gesprek tot lang na de installatie.
              </p>
              <a href="/contact" className={styles.heroBtn}>
                Plan een gesprek
              </a>
            </div>

            {/* Zweeft over rechterbovenhoek van het glaspaneel */}
            <div className={styles.heroFloatImg}>
              <img
                src="https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815908/AFSPRAAK_OP_DE_BANK_qqikqt.png"
                alt="Adviesgesprek bij de klant thuis"
                className={styles.heroFloatImgEl}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Waarom Verdura ───────────────────────────────────────────── */}
      <section className={styles.waaromSectie}>
        <div className={styles.sectionInner}>
          <div className={styles.waaromGrid}>
            <div className={styles.waaromTekst}>
              <span className={styles.sectionLabel}>Onze aanpak</span>
              <h2 className={styles.sectionTitel}>Waarom Verdura het verschil maakt</h2>
              <p className={styles.sectionSubtitel}>
                Verdura is een gespecialiseerd adviesbureau dat je begeleidt bij elke stap van het verduurzamingsproces. We voeren zelf geen installaties uit, maar werken samen met een vaste groep installateurs die we zorgvuldig hebben geselecteerd op kwaliteit en betrouwbaarheid.
              </p>
              <ul className={styles.waaromLijst}>
                {[
                  'Advies op maat, afgestemd op jouw woning en wensen',
                  'Eén vast aanspreekpunt van begin tot eind',
                  'Samenwerking met ervaren en betrouwbare installateurs',
                  'Heldere communicatie, zonder verrassingen',
                  'Wij regelen de subsidieaanvraag voor je',
                ].map((item) => (
                  <li key={item} className={styles.waaromItem}>
                    <span className={styles.waaromCheck}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="var(--green-mid)" fillOpacity="0.12" />
                        <path d="M4.5 8l2.5 2.5 4.5-5" stroke="var(--green-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/contact" className={styles.waaromBtn}>Gratis adviesgesprek</a>
            </div>
            <div className={styles.waaromStats}>
              {[
                { cijfer: '500+', label: 'Tevreden klanten' },
                { cijfer: '6', label: 'Jaar ervaring' },
                { cijfer: '98%', label: 'Klanten beveelt ons aan' },
                { cijfer: '€2.4M', label: 'Aan subsidies geregeld' },
              ].map((s) => (
                <div key={s.label} className={styles.statBlok}>
                  <span className={styles.statCijfer}>{s.cijfer}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Waarden ──────────────────────────────────────────────────── */}
      <section className={styles.waardenSectie}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>Waar we voor staan</span>
          <h2 className={styles.sectionTitel}>Onze waarden</h2>
          <div className={styles.waardenGrid}>
            {waarden.map((w, i) => (
              <WaardeKaart key={w.titel} waarde={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className={styles.teamSectie}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionLabel}>Het team</span>
          <h2 className={styles.sectionTitel}>De mensen achter Verdura</h2>
          <p className={styles.teamIntro}>
            Een klein, hecht team dat groot denkt. Iedereen bij Verdura heeft een specifieke rol, maar we delen dezelfde missie: jouw woning verduurzamen op een manier die bij jou past.
          </p>
          <div className={styles.teamGrid}>
            {teamleden.map((lid, i) => (
              <TeamKaart key={lid.rol} lid={lid} index={i} />
            ))}
          </div>
          <p className={styles.teamPlaceholderNote}>
            Foto's en namen worden binnenkort toegevoegd.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaLabel}>Klaar om te beginnen?</p>
          <h2 className={styles.ctaTitel}>Maak kennis met ons team</h2>
          <p className={styles.ctaTekst}>
            Plan een gratis en vrijblijvend adviesgesprek. Wij komen bij je thuis, bekijken de mogelijkheden en geven je een eerlijk advies.
          </p>
          <a href="/contact" className={styles.ctaBtn}>Plan een gratis gesprek</a>
        </div>
      </section>

    </main>
  );
}