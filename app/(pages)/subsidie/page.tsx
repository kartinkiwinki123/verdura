'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './subsidies.module.css';

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

const regelingen = [
  {
    id: 'isde',
    label: 'ISDE',
    titel: 'Investeringssubsidie Duurzame Energie',
    subtitel: 'De belangrijkste rijkssubsidie voor woningeigenaren',
    kleur: 'groen',
    bedrag: 'tot €13.000',
    icon: '🏛️',
    inhoud: [
      {
        kopje: 'Wat is het?',
        tekst:
          'De ISDE is de centrale subsidieregeling van de rijksoverheid voor woningeigenaren die hun woning willen verduurzamen. In 2026 is er in totaal €500 miljoen beschikbaar voor warmtepompen, zonneboilers, isolatiemaatregelen, ventilatiesystemen en aansluitingen op een warmtenet.',
      },
      {
        kopje: 'Warmtepomp',
        tekst:
          'Je ontvangt altijd minimaal €500 subsidie voor een warmtepomp. De hoogte hangt af van het type en vermogen. Voor een eerste lucht-waterwarmtepomp met A+++ label en 4 kW vermogen ontvang je bijvoorbeeld €1.025 startbedrag + 4 x €225 per kW + €200 energielabelbonus = €2.125. Het maximale subsidiebedrag voor warmtepompen ligt op bijna €13.000.',
      },
      {
        kopje: 'Ventilatie (nieuw in 2026)',
        tekst:
          'Vanaf 2026 kun je ook €400 subsidie krijgen voor energiezuinige ventilatiesystemen, mits je dit combineert met een of meer isolatiemaatregelen. Denk aan een afzuigventilator met minimaal 2 CO2-sensoren of een WTW-unit.',
      },
      {
        kopje: 'Zonneboiler',
        tekst:
          'Voor een zonneboiler ontvang je minimaal €300 subsidie. De exacte hoogte hangt af van het apertuuroppervlak en de inhoud van het boilervat.',
      },
      {
        kopje: 'Voorwaarden',
        lijst: [
          'Je bent eigenaar én bewoner van de woning',
          'Het apparaat is al betaald en geïnstalleerd',
          'Je kunt bewijs van aanschaf en betaling tonen',
          'Een erkend installateur heeft het geïnstalleerd',
          'Je mag het apparaat niet binnen een jaar na de beslissing verwijderen',
          'Aanvragen via DigiD op Mijn RVO binnen 24 maanden na installatie',
        ],
      },
      {
        kopje: 'Let op in 2026',
        tekst:
          'Vanaf 2026 krijg je geen subsidie meer voor split lucht-water warmtepompen met een vulgewicht onder de 3 kilogram en een Global Warming Potential (GWP) hoger dan 750. Dit volgt uit Europese regels om de uitstoot van broeikasgassen te verminderen.',
      },
    ],
    bron: { label: 'rvo.nl/subsidies-financiering/isde', url: 'https://www.rvo.nl/subsidies-financiering/isde' },
  },
  {
    id: 'btw',
    label: '0% BTW',
    titel: 'Nultarief BTW op zonnepanelen',
    subtitel: 'Geen belasting over aankoop en installatie',
    kleur: 'amber',
    bedrag: '0% BTW',
    icon: '☀️',
    inhoud: [
      {
        kopje: 'Wat is het?',
        tekst:
          'Sinds 1 januari 2023 geldt een BTW-tarief van 0% voor de levering en installatie van zonnepanelen op of bij een woning. Je betaalt dus geen BTW over je zonnepanelen en hoeft ook niets terug te vragen.',
      },
      {
        kopje: 'Waarvoor geldt het?',
        lijst: [
          'Niet-geïntegreerde zonnepanelen op het dak (meest voorkomend)',
          'Geïntegreerde zonnepanelen die ook als dakbedekking dienen',
          'Tijdelijke demontage gevolgd door herplaatsing op dezelfde woning',
          '"Plug and play" zonnepanelen geïnstalleerd op of bij een woning',
        ],
      },
      {
        kopje: 'Waarvoor geldt het NIET?',
        lijst: [
          'Geïntegreerde zonnepanelen op een nieuwbouwwoning (21% BTW)',
          'Zonnepanelen op een bedrijfspand zonder woonfunctie',
          'PVT-systemen, zonnecollectoren of zonnepanelen in ramen',
          'Installaties buiten of niet bij een woning',
        ],
      },
    ],
    bron: { label: 'belastingdienst.nl', url: 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/goederen_0_btw/btw-tarief-zonnepanelen' },
  },
  {
    id: 'saldering',
    label: 'Saldering',
    titel: 'Salderingsregeling stopt in 2027',
    subtitel: 'Zonnepanelen nú zijn nog het meest voordelig',
    kleur: 'signaal',
    bedrag: 'tot eind 2026',
    icon: '⏳',
    inhoud: [
      {
        kopje: 'Wat is de salderingsregeling?',
        tekst:
          'Met de salderingsregeling kun je zelf opgewekte elektriciteit wegstrepen tegen je verbruik op een ander moment. Lever je in de zomer 2.500 kWh terug, dan mag je in de winter 2.500 kWh gebruiken zonder stroomkosten, netwerkkosten of energiebelasting te betalen.',
      },
      {
        kopje: 'Wat verandert er in 2027?',
        tekst:
          'De salderingsregeling stopt per 1 januari 2027. Eigenaren van zonnepanelen kunnen hun opgewekte stroom dan niet meer wegstrepen tegen hun verbruik. Ze krijgen wel een vergoeding van de energieleverancier voor alle teruggeleverde stroom. Tot 2030 moet deze vergoeding minimaal 50% van het kale leveringstarief zijn.',
      },
      {
        kopje: 'Blijven zonnepanelen de moeite waard?',
        tekst:
          'Ja. Zonnepanelen gaan gemiddeld 25 jaar mee en verdienen zich ook na afschaffing van de salderingsregeling ruim terug. De sleutel is zoveel mogelijk zelf verbruiken op het moment dat je panelen stroom opwekken. Een thuisbatterij helpt daarbij aanzienlijk.',
      },
      {
        kopje: 'Waarom stopt de regeling?',
        lijst: [
          'Salderen zorgt voor hogere stroomprijzen voor huishoudens zonder zonnepanelen',
          'De overheid ontvangt minder belastinginkomsten door de regeling',
          'Het kabinet wil stimuleren dat opgewekte stroom direct wordt verbruikt',
          'Dit vermindert de druk op het elektriciteitsnet',
        ],
      },
    ],
    bron: { label: 'rijksoverheid.nl/salderingsregeling', url: 'https://www.rijksoverheid.nl/onderwerpen/energie-thuis/salderingsregeling' },
  },
  {
    id: 'thuisbatterij',
    label: 'Thuisbatterij',
    titel: 'Thuisbatterij: geen landelijke subsidie',
    subtitel: 'Wel BTW-voordeel en lokale regelingen',
    kleur: 'neutraal',
    bedrag: 'lokaal verschilt',
    icon: '🔋',
    inhoud: [
      {
        kopje: 'Landelijke situatie',
        tekst:
          'Er is in 2026 geen directe landelijke subsidie voor thuisbatterijen voor particulieren. De Nederlandse overheid geeft op dit moment voorrang aan maatregelen die direct energieverbruik verlagen, zoals isolatie, warmtepompen en zonnepanelen.',
      },
      {
        kopje: '0% BTW bij combinatie met zonnepanelen',
        tekst:
          'Combineer je een thuisbatterij met zonnepanelen, dan valt de batterij in veel gevallen onder hetzelfde 0% BTW-tarief. Wordt de batterij apart geïnstalleerd, dan geldt het reguliere tarief van 21%.',
      },
      {
        kopje: 'BTW terugvragen via dynamisch contract',
        tekst:
          'Heb je een dynamisch energiecontract en levert je batterij stroom terug aan het net, dan kun je als btw-ondernemer de 21% BTW terugvragen bij de Belastingdienst. Dit vereist een energiemanagementsysteem (EMS) en een energieleverancier die teruglevering vergoedt.',
      },
      {
        kopje: 'Lokale regelingen',
        tekst:
          'Sommige gemeenten en provincies bieden eigen regelingen. Provincie Flevoland biedt sinds 2026 25% van de kosten terug (minimaal €750, maximaal €1.250). Kijk altijd op de website van jouw gemeente of provincie voor actuele mogelijkheden.',
      },
    ],
    bron: { label: 'belastingdienst.nl', url: 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/hoe_werkt_de_btw/voor_wie_geldt_de_btw/eigenaren-van-zonnepanelen/eigenaren-van-zonnepanelen' },
  },
  {
    id: 'warmtefonds',
    label: 'Warmtefonds',
    titel: 'Energiebespaarlening',
    subtitel: 'Financiering via Nationaal Warmtefonds',
    kleur: 'blauw',
    bedrag: '0% rente mogelijk',
    icon: '🏦',
    inhoud: [
      {
        kopje: 'Wat is het?',
        tekst:
          'Het Nationaal Warmtefonds is opgericht door de rijksoverheid en biedt een aantrekkelijke lening aan woningeigenaren die willen verduurzamen maar de investering niet in één keer kunnen betalen.',
      },
      {
        kopje: 'Voorwaarden en bedragen',
        lijst: [
          'Lenen tussen €1.000 en €29.000',
          'Looptijd 7, 10, 15 of (bij >€15.000) 20 jaar',
          'Je moet eigenaar én bewoner zijn van een bestaande woning',
          'Geen aanvullende zekerheden, geen taxatiekosten, geen notaris',
          'Extra aflossen is altijd kosteloos mogelijk',
        ],
      },
      {
        kopje: '0% rente voor lagere en middeninkomens',
        tekst:
          'Eigenaar-bewoners met een gezamenlijk verzamelinkomen van minder dan €60.000 kunnen de lening afsluiten tegen 0% rente. Je vraagt de gewone Energiebespaarlening aan, waarna het Warmtefonds beoordeelt of je in aanmerking komt voor het nultarief.',
      },
      {
        kopje: 'Combinatielening voor wie moeilijk kan lenen',
        tekst:
          'Lukt het reguliere aflossen niet? Het Warmtefonds biedt een Combinatielening waarbij je de eerste 5 jaar geen rente én geen aflossing betaalt. Na 5 jaar volgt een hertoets op basis van je actuele situatie.',
      },
    ],
    bron: { label: 'warmtefonds.nl', url: 'https://www.warmtefonds.nl/particulieren/voorwaarden-energiebespaarlening' },
  },
];

function RegelingKaart({ regeling, index }: { regeling: typeof regelingen[0]; index: number }) {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      ref={ref}
      className={`${styles.kaart} ${styles[`kaart_${regeling.kleur}`]} ${inView ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <button className={styles.kaartHeader} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div className={styles.kaartHeaderLinks}>
          <span className={styles.kaartIcon}>{regeling.icon}</span>
          <div>
            <span className={`${styles.kaartBadge} ${styles[`badge_${regeling.kleur}`]}`}>{regeling.label}</span>
            <h2 className={styles.kaartTitel}>{regeling.titel}</h2>
            <p className={styles.kaartSubtitel}>{regeling.subtitel}</p>
          </div>
        </div>
        <div className={styles.kaartHeaderRechts}>
          <span className={styles.kaartBedrag}>{regeling.bedrag}</span>
          <span className={`${styles.kaartChevron} ${open ? styles.kaartChevronOpen : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      {open && (
        <div className={styles.kaartBody}>
          {regeling.inhoud.map((blok, i) => (
            <div key={i} className={styles.infoBlok}>
              <h3 className={styles.infoKopje}>{blok.kopje}</h3>
              {blok.tekst && <p className={styles.infoTekst}>{blok.tekst}</p>}
              {blok.lijst && (
                <ul className={styles.infoLijst}>
                  {blok.lijst.map((item, j) => (
                    <li key={j} className={styles.infoItem}>
                      <span className={styles.infoCheck}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="7" fill="currentColor" fillOpacity="0.12" />
                          <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <a href={regeling.bron.url} target="_blank" rel="noopener noreferrer" className={styles.bronLink}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6 2H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V8M9 1h4m0 0v4m0-4L6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Bron: {regeling.bron.label}
          </a>
        </div>
      )}
    </div>
  );
}

export default function SubsidiesPage() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <img
          src="https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815912/GROTE_BLADEREN_DONKERGROEN_x2w6pp.png"
          alt=""
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.heroGlass}>
            <span className={styles.heroLabel}>Subsidies & Regelingen 2026</span>
            <h1 className={styles.heroTitel}>
              Wat krijg jij{' '}
              <span className={styles.heroAccent}>terug</span>?
            </h1>
            <p className={styles.heroSubtitel}>
              De overheid stimuleert verduurzaming via subsidies, belastingvoordelen en gunstige leningen. Op deze pagina vind je een helder overzicht van alle actuele regelingen, gebaseerd op officiële bronnen.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statCijfer}>€500M</span>
                <span className={styles.statLabel}>ISDE budget 2026</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statCijfer}>0%</span>
                <span className={styles.statLabel}>BTW op zonnepanelen</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statCijfer}>2027</span>
                <span className={styles.statLabel}>Saldering stopt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uitlegbalk */}
      <div className={styles.uitleg}>
        <div className={styles.uitlegInner}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.uitlegIcon}>
            <circle cx="9" cy="9" r="8.5" stroke="currentColor" />
            <path d="M9 8v5M9 6v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p>
            Subsidies veranderen regelmatig. De informatie op deze pagina is gebaseerd op officiële overheidsbronnen en bijgewerkt in mei 2026. Klik op de bronlinks voor de meest actuele bedragen en voorwaarden.
          </p>
        </div>
      </div>

      {/* Regelingen */}
      <section className={styles.regelingen}>
        <div className={styles.regelingenInner}>
          {regelingen.map((r, i) => (
            <RegelingKaart key={r.id} regeling={r} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaLabel}>Niet zeker waar je recht op hebt?</p>
          <h2 className={styles.ctaTitel}>Verdura rekent het voor je uit</h2>
          <p className={styles.ctaTekst}>
            Onze adviseur bekijkt jouw situatie en berekent welke subsidies en regelingen voor jou van toepassing zijn. Gratis, zonder verplichtingen.
          </p>
          <div className={styles.ctaBtns}>
            <a href="/contact" className={styles.ctaBtnPrimary}>Plan een gratis gesprek</a>
            <a href="/aanbod" className={styles.ctaBtnOutline}>Bekijk ons aanbod</a>
          </div>
        </div>
      </section>
    </main>
  );
}