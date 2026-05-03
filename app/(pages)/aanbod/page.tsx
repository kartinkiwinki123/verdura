'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './aanbod.module.css';

const producten = [
  {
    id: 'zonnepanelen',
    naam: 'Zonnepanelen',
    tagline: 'Wek je eigen stroom op',
    intro:
      'Bespaar de komende 25 jaar tot wel €60.000 door zelf jouw elektriciteit op te wekken. Verdura levert uitsluitend panelen van topkwaliteit, met 25 of 40 jaar productgarantie.',
    voordelen: [
      'De beste zonnepanelen op de markt',
      '30% meer opbrengst dan het gemiddelde',
      'Cradle-to-Cradle gecertificeerd',
      'Inclusief monitoring app',
    ],
    extra:
      'Onze adviseur berekent op locatie precies hoeveel panelen jouw dak aankan en wat de terugverdientijd is. Gemiddeld hebben onze klanten hun investering binnen 6 jaar terugverdiend.',
    badge: 'Meest gekozen',
    badgeType: 'amber',
    image:
      'https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815920/ZONNENPANELEN_DAKPANNEN_INSTALLATIE_ue4j2d.png',
    imageAlt: 'Zonnepanelen geïnstalleerd op dakpannen',
    kleur: 'licht',
  },
  {
    id: 'thuisbatterij',
    naam: 'Thuisbatterij',
    tagline: 'Sla je zonne-energie slim op',
    intro:
      'Een thuisbatterij maakt je écht onafhankelijk van het energienet. Verhoog jouw zelfvoorzieningsgraad tot 70% en profiteer van slimme aansturing die automatisch handelt op de energiemarkt.',
    voordelen: [
      'Geen terugleverings kosten meer',
      '70% eigen zonnestroom benutten',
      'Slimme aansturing op energieprijzen',
      'Werkt ook bij stroomuitval',
    ],
    extra:
      'De thuisbatterij werkt naadloos samen met jouw zonnepanelen. Via de app zie je live hoeveel energie je opwekt, opslaat en verbruikt. Verdura installeert en configureert alles voor je.',
    badge: 'Slim combineren',
    badgeType: 'green',
    image:
      'https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815908/BATTERIJ_IN_GARAGE_pltdhk.png',
    imageAlt: 'Thuisbatterij geïnstalleerd in garage',
    kleur: 'donker',
  },
  {
    id: 'warmtepomp',
    naam: 'Warmtepomp',
    tagline: 'Tot 81% minder gasverbruik',
    intro:
      'Een warmtepomp is de meest efficiënte manier om je woning te verwarmen. Verdura weet precies welk systeem past bij jouw woning en installeert het van begin tot eind.',
    voordelen: [
      'Verlaag je gasverbruik met 81-100%',
      'Beste-deal garantie op alle merken',
      'Gevarieerd assortiment voor elk huis',
      'Hoogste rendement door juiste dimensionering',
    ],
    extra:
      'Wij werken samen met de beste fabrikanten en hebben geen voorkeur voor een bepaald merk. Zo krijg jij altijd de warmtepomp die het beste past bij jouw situatie, niet de duurste.',
    badge: 'Gasloos wonen',
    badgeType: 'sky',
    image:
      'https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777817792/WARMTEPOMP_jbpo1r.png',
    imageAlt: 'Warmtepomp buiten-unit',
    kleur: 'licht',
  },
  {
    id: 'airconditioning',
    naam: 'Airconditioning',
    tagline: 'Koel in de zomer, warm in de winter',
    intro:
      'Een moderne airco is meer dan een koelmachine. De nieuwste systemen verwarmen ook efficiënt, zijn fluisterstil en verbruiken tot 60% minder energie dan oudere modellen.',
    voordelen: [
      'Energiezuinig koelen én verwarmen',
      '5 jaar garantie op onderdelen en arbeid',
      'Service binnen 48 uur bij storing',
      'Geschikt voor elke ruimte',
    ],
    extra:
      'Verdura adviseert op maat welk systeem past bij jouw woning. Of het nu gaat om één slaapkamer of een complete woning, wij zorgen voor de juiste capaciteit en een strakke installatie.',
    badge: 'Jaar-rond comfort',
    badgeType: 'sky',
    image:
      'https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777817791/AIRCO_cecazt.png',
    imageAlt: 'Airconditioning unit aan muur',
    kleur: 'donker',
  },
  {
    id: 'laadpaal',
    naam: 'Laadpaal',
    tagline: 'Laad thuis voor de helft van de prijs',
    intro:
      'Thuis laden is de slimste keuze voor een elektrische auto. Combineer je laadpaal met zonnepanelen en laad je auto op met 100% eigen stroom.',
    voordelen: [
      'Tot 3x goedkoper dan openbaar laden',
      'Slim laden op zonne-energie',
      'Geschikt voor alle EV-merken',
      'Inclusief installatie en inbedrijfstelling',
    ],
    extra:
      'Onze laadpalen zijn compatibel met alle gangbare elektrische voertuigen en kunnen gekoppeld worden aan je energiebeheer systeem. Zo laad je altijd op het goedkoopste moment.',
    badge: 'EV-ready',
    badgeType: 'green',
    image:
      'https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815914/LAADPAAL_IN_GARAGE_hjjiid.png',
    imageAlt: 'Laadpaal in garage',
    kleur: 'licht',
  },
  {
    id: 'infraroodverwarming',
    naam: 'Infraroodverwarming',
    tagline: 'Direct warmte, geen grote investering',
    intro:
      'Infraroodverwarming is dé oplossing om direct gas te besparen zonder grote verbouwing. Geschikt als hoofd- én bijverwarming, en verkrijgbaar in strakke designs die naadloos opgaan in elk interieur.',
    voordelen: [
      'Bij- én hoofdverwarming mogelijk',
      'Tot wel 50% minder gasverbruik',
      'Kwaliteit & design in één',
      'Eenvoudige en snelle installatie',
    ],
    extra:
      'Infraroodpanelen verwarmen direct de objecten en mensen in een ruimte, niet de lucht. Dat maakt het systeem bijzonder efficiënt en aangenaam. Verkrijgbaar als spiegel, schilderij of vlak wit paneel.',
    badge: 'Snel resultaat',
    badgeType: 'amber',
    image:
      'https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777818930/INFRAROODVERWARMING_vdtcgp.jpg',
    imageAlt: 'Infrarood verwarmingspaneel aan muur',
    kleur: 'donker',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ProductBlok({
  product,
  index,
}: {
  product: (typeof producten)[0];
  index: number;
}) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`${styles.productBlok} ${styles[product.kleur]} ${inView ? styles.visible : ''}`}
      id={product.id}
    >
      <div className={styles.productInner}>
        <div className={`${styles.productContent} ${isEven ? styles.contentLinks : styles.contentRechts}`}>
          <div className={styles.productText}>
            <div className={styles.productMeta}>
              <span className={`${styles.badge} ${styles[`badge_${product.badgeType}`]}`}>
                {product.badge}
              </span>
              <span className={styles.productNummer}>0{index + 1}</span>
            </div>
            <h2 className={styles.productNaam}>{product.naam}</h2>
            <p className={styles.productTagline}>{product.tagline}</p>
            <p className={styles.productIntro}>{product.intro}</p>
            <ul className={styles.voordelen}>
              {product.voordelen.map((v) => (
                <li key={v} className={styles.voordeel}>
                  <span className={styles.checkIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="var(--green-mid)" fillOpacity="0.12" />
                      <path d="M4.5 8l2.5 2.5 4.5-5" stroke="var(--green-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {v}
                </li>
              ))}
            </ul>
            <p className={styles.productExtra}>{product.extra}</p>
            <div className={styles.productCta}>
              <button className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
                Vraag een offerte aan
              </button>
              <button className={`${styles.ctaBtn} ${styles.ctaBtnOutline}`}>
                Meer informatie
              </button>
            </div>
          </div>
          <div className={styles.productAfbeelding}>
            <div className={styles.afbeeldingWrapper}>
              <img
                src={product.image}
                alt={product.imageAlt}
                className={styles.productImg}
              />
              <div className={styles.afbeeldingGlow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AanbodPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <img
          src="https://res.cloudinary.com/drcr4ekja/image/upload/q_auto/f_auto/v1777815924/TROPISCH_BLAD_xdo21b.png"
          alt=""
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroGlass}>
            <div className={styles.heroLabel}>Ons aanbod</div>
            <h1 className={styles.heroTitel}>
              Alles voor een{' '}
              <span className={styles.heroAccent}>energieneutraal</span>{' '}
              <span className={styles.heroAccentTwee}>thuis</span>
            </h1>
            <p className={styles.heroSubtitel}>
              Van zonnepanelen tot warmtepompen en slimme opslag. Verdura begeleidt je van advies tot installatie, zodat jij er geen omkijken naar hebt.
            </p>
            <div className={styles.heroNav}>
              {producten.map((p) => (
                <a key={p.id} href={`#${p.id}`} className={styles.heroNavItem}>
                  {p.naam}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Product secties */}
      {producten.map((product, index) => (
        <ProductBlok key={product.id} product={product} index={index} />
      ))}

      {/* CTA blok onderaan */}
      <section className={styles.ctaBlok}>
        <div className={styles.ctaBlokInner}>
          <p className={styles.ctaBlokLabel}>Klaar om te beginnen?</p>
          <h2 className={styles.ctaBlokTitel}>Laat ons jouw woning beoordelen</h2>
          <p className={styles.ctaBlokTekst}>
            Onze adviseur komt bij je thuis, neemt de tijd voor al je vragen en geeft je daarna een heldere offerte. Geen verplichtingen, geen verborgen kosten.
          </p>
          <button className={styles.ctaBlokBtn}>Plan een gratis adviesgesprek</button>
        </div>
      </section>
    </main>
  );
}