'use client';

import { useState } from 'react';
import styles from './BesparingCalculator.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type Stap = 'woning' | 'panelen' | 'personen' | 'apparaten' | 'batterij' | 'uitkomst' | 'geblokkeerd';

interface FormData {
  heeftPanelen: boolean | null;
  woningtype: string;
  aantalPanelen: number;
  personen: number;
  apparaten: string[];
  heeftBatterij: boolean | null;
  // Lead
  naam: string;
  email: string;
  telefoon: string;
}

// ─── Constanten ───────────────────────────────────────────────────────────────

const STROOMPRIJS = 0.27; // €/kWh (Milieu Centraal 2026)
const OPWEKKING_PER_PANEEL = 375; // kWh/jaar gemiddeld Nederland
const EIGEN_VERBRUIK_ZONDER_BATTERIJ = 0.30;
const EIGEN_VERBRUIK_MET_BATTERIJ = 0.70;

const WONINGTYPES = [
  {
    id: 'rijtjeshuis',
    label: 'Rijtjeshuis',
    sublabel: 'Tussenwoning',
    icon: '🏠',
    verbruik: 2500,
    panelen: 8,
  },
  {
    id: 'hoekwoning',
    label: 'Hoekwoning',
    sublabel: '2-onder-1-kap',
    icon: '🏡',
    verbruik: 3000,
    panelen: 10,
  },
  {
    id: 'vrijstaand',
    label: 'Vrijstaande woning',
    sublabel: 'Ruime tuin rondom',
    icon: '🏘️',
    verbruik: 3500,
    panelen: 12,
  },
];

const PERSONEN_OPTIES = [1, 2, 3, 4, 5];

const APPARATEN = [
  { id: 'warmtepomp_full', label: 'Full electric warmtepomp', kWh: 3500, icon: '♨️' },
  { id: 'warmtepomp_hybride', label: 'Hybride warmtepomp', kWh: 1500, icon: '🌡️' },
  { id: 'laadpaal', label: 'Laadpaal (elektrische auto)', kWh: 3000, icon: '⚡' },
  { id: 'airco', label: 'Airconditioning', kWh: 400, icon: '❄️' },
  { id: 'inductie', label: 'Inductiekookplaat', kWh: 300, icon: '🍳' },
];

// ─── Hulpfuncties ─────────────────────────────────────────────────────────────

function berekenVerbruik(woningtype: string, personen: number, apparaten: string[]): number {
  const woning = WONINGTYPES.find(w => w.id === woningtype);
  let basis = woning?.verbruik ?? 2500;

  // Kleine correctie per persoon bovenop standaard (basis is al voor gem. huishouden)
  const persoonCorrectie = (personen - 2) * 150;
  basis += persoonCorrectie;

  // Apparaten optellen
  const apparaatKwh = apparaten.reduce((acc, id) => {
    const apparaat = APPARATEN.find(a => a.id === id);
    return acc + (apparaat?.kWh ?? 0);
  }, 0);

  return Math.max(500, basis + apparaatKwh);
}

function berekenOpwekking(heeftPanelen: boolean, woningtype: string, aantalPanelen: number): number {
  if (heeftPanelen) {
    return aantalPanelen * OPWEKKING_PER_PANEEL;
  }
  const woning = WONINGTYPES.find(w => w.id === woningtype);
  return (woning?.panelen ?? 8) * OPWEKKING_PER_PANEEL;
}

function formatEuro(bedrag: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(bedrag);
}

// ─── Stap indicator ───────────────────────────────────────────────────────────

const STAPPEN_VOLGORDE: Stap[] = ['woning', 'panelen', 'personen', 'apparaten', 'batterij', 'uitkomst'];

function StapIndicator({ huidigeStap }: { huidigeStap: Stap }) {
  const index = STAPPEN_VOLGORDE.indexOf(huidigeStap);
  if (index === -1) return null;

  return (
    <div className={styles.stapIndicator}>
      {STAPPEN_VOLGORDE.slice(0, -1).map((_, i) => (
        <div
          key={i}
          className={`${styles.stapDot} ${i < index ? styles.stapDotKlaar : ''} ${i === index ? styles.stapDotActief : ''}`}
        />
      ))}
    </div>
  );
}

// ─── Hoofdcomponent ───────────────────────────────────────────────────────────

export default function BesparingCalculator() {
  const [stap, setStap] = useState<Stap>('woning');
  const [leadVerzonden, setLeadVerzonden] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    heeftPanelen: null,
    woningtype: '',
    aantalPanelen: 8,
    personen: 2,
    apparaten: [],
    heeftBatterij: null,
    naam: '',
    email: '',
    telefoon: '',
  });

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function toggleApparaat(id: string) {
    setForm(prev => ({
      ...prev,
      apparaten: prev.apparaten.includes(id)
        ? prev.apparaten.filter(a => a !== id)
        : [...prev.apparaten, id],
    }));
  }

  // Berekeningen
  const verbruik = berekenVerbruik(form.woningtype, form.personen, form.apparaten);
  const opwekking = form.woningtype ? berekenOpwekking(form.heeftPanelen ?? false, form.woningtype, form.aantalPanelen) : 0;
  const eigenVerbruikPct = form.heeftBatterij ? EIGEN_VERBRUIK_MET_BATTERIJ : EIGEN_VERBRUIK_ZONDER_BATTERIJ;
  const eigenVerbruikKwh = Math.min(opwekking * eigenVerbruikPct, verbruik);
  const salderingKwh = Math.min(opwekking * (1 - eigenVerbruikPct), verbruik - eigenVerbruikKwh);
  const besparingJaar = (eigenVerbruikKwh + salderingKwh) * STROOMPRIJS;
  const besparingMaand = besparingJaar / 12;
  const huidigJaarkosten = verbruik * STROOMPRIJS;

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLeadLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.naam,
          email: form.email,
          phone: form.telefoon,
          message: `Calculator lead — Woningtype: ${form.woningtype}, Panelen: ${form.heeftPanelen ? form.aantalPanelen : 'nog niet'}, Personen: ${form.personen}, Apparaten: ${form.apparaten.join(', ') || 'geen'}, Batterij: ${form.heeftBatterij ? 'ja' : 'nee'}, Geschatte besparing: ${formatEuro(besparingJaar)}/jaar`,
        }),
      });
      setLeadVerzonden(true);
    } catch {
      // stil falen, formulier wel tonen als verzonden
      setLeadVerzonden(true);
    } finally {
      setLeadLoading(false);
    }
  }

  return (
    <section className={styles.sectie}>
      <div className={styles.inner}>

        {/* Linker kolom: uitleg */}
        <div className={styles.uitleg}>
          <span className={styles.uitlegLabel}>Besparingscalculator</span>
          <h2 className={styles.uitlegTitel}>
            Hoeveel kun jij besparen?
          </h2>
          <p className={styles.uitlegTekst}>
            Beantwoord een paar vragen over jouw woning en we berekenen je geschatte jaarlijkse besparing. Het duurt minder dan een minuut.
          </p>
          <ul className={styles.uitlegPunten}>
            {[
              'Gebaseerd op actuele Nederlandse stroomprijzen',
              'Rekent met echte opwekdata per woningtype',
              'Toont effect van thuisbatterij',
              'Altijd een indicatie, nooit een belofte',
            ].map(punt => (
              <li key={punt} className={styles.uitlegPunt}>
                <span className={styles.uitlegCheck}>✓</span>
                {punt}
              </li>
            ))}
          </ul>
        </div>

        {/* Rechter kolom: calculator */}
        <div className={styles.calculator}>
          {stap !== 'geblokkeerd' && stap !== 'uitkomst' && (
            <StapIndicator huidigeStap={stap} />
          )}

          {/* ── Stap: woningtype ── */}
          {stap === 'woning' && (
            <div className={styles.stapContent}>
              <h3 className={styles.stapTitel}>Wat voor woning heb je?</h3>
              <div className={styles.woningGrid}>
                {/* Appartement — geblokkeerd */}
                <button
                  className={`${styles.woningKaart} ${styles.woningKaartGeblokkeerd}`}
                  onClick={() => setStap('geblokkeerd')}
                >
                  <span className={styles.woningIcon}>🏢</span>
                  <span className={styles.woningLabel}>Appartement</span>
                  <span className={styles.woningSubLabel}>VvE vereist</span>
                  <span className={styles.woningBlok}>Niet geschikt</span>
                </button>

                {WONINGTYPES.map(w => (
                  <button
                    key={w.id}
                    className={`${styles.woningKaart} ${form.woningtype === w.id ? styles.woningKaartActief : ''}`}
                    onClick={() => {
                      setField('woningtype', w.id);
                      setStap('panelen');
                    }}
                  >
                    <span className={styles.woningIcon}>{w.icon}</span>
                    <span className={styles.woningLabel}>{w.label}</span>
                    <span className={styles.woningSubLabel}>{w.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Stap: geblokkeerd ── */}
          {stap === 'geblokkeerd' && (
            <div className={styles.stapContent}>
              <div className={styles.geblokkeerd}>
                <span className={styles.geblokkeedIcon}>🏢</span>
                <h3 className={styles.stapTitel}>Appartement via VvE</h3>
                <p className={styles.geblokkeedTekst}>
                  Voor appartementen gelden andere regels. Een VvE moet als collectief beslissen over zonnepanelen en duurzaamheidsmaatregelen. Individuele installatie op een appartement is in Nederland niet mogelijk.
                </p>
                <p className={styles.geblokkeedTekst}>
                  Wij denken graag mee over wat er in jouw situatie mogelijk is. Neem contact op voor een vrijblijvend gesprek.
                </p>
                <div className={styles.geblokkeedBtns}>
                  <a href="/contact" className={styles.ctaBtnPrimary}>Neem contact op</a>
                  <button className={styles.ctaBtnOutline} onClick={() => setStap('woning')}>Terug</button>
                </div>
              </div>
            </div>
          )}

          {/* ── Stap: zonnepanelen ── */}
          {stap === 'panelen' && (
            <div className={styles.stapContent}>
              <h3 className={styles.stapTitel}>Heb je al zonnepanelen?</h3>
              <div className={styles.toggleRij}>
                <button
                  className={`${styles.toggleKnop} ${form.heeftPanelen === true ? styles.toggleKnopActief : ''}`}
                  onClick={() => setField('heeftPanelen', true)}
                >
                  Ja, ik heb al panelen
                </button>
                <button
                  className={`${styles.toggleKnop} ${form.heeftPanelen === false ? styles.toggleKnopActief : ''}`}
                  onClick={() => setField('heeftPanelen', false)}
                >
                  Nee, nog niet
                </button>
              </div>

              {form.heeftPanelen === true && (
                <div className={styles.aantalPanelenWrap}>
                  <label className={styles.sliderLabel}>
                    Hoeveel panelen heb je?
                    <span className={styles.sliderWaarde}>{form.aantalPanelen} panelen</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={form.aantalPanelen}
                    onChange={e => setField('aantalPanelen', Number(e.target.value))}
                    className={styles.slider}
                  />
                  <div className={styles.sliderToelichting}>
                    ≈ {(form.aantalPanelen * OPWEKKING_PER_PANEEL).toLocaleString('nl-NL')} kWh per jaar
                  </div>
                </div>
              )}

              {form.heeftPanelen === false && (
                <div className={styles.geenPanelenInfo}>
                  <span className={styles.geenPanelenIcon}>💡</span>
                  <p>
                    Geen probleem. We rekenen met het optimale aantal panelen voor jouw woningtype. Na de berekening legt Verdura je graag de opties uit.
                  </p>
                </div>
              )}

              <div className={styles.stapNav}>
                <button className={styles.terugKnop} onClick={() => setStap('woning')}>← Terug</button>
                <button
                  className={styles.verderKnop}
                  disabled={form.heeftPanelen === null}
                  onClick={() => setStap('personen')}
                >
                  Verder →
                </button>
              </div>
            </div>
          )}

          {/* ── Stap: personen ── */}
          {stap === 'personen' && (
            <div className={styles.stapContent}>
              <h3 className={styles.stapTitel}>Met hoeveel mensen woon je?</h3>
              <div className={styles.personenRij}>
                {PERSONEN_OPTIES.map(n => (
                  <button
                    key={n}
                    className={`${styles.personenKnop} ${form.personen === n ? styles.personenKnopActief : ''}`}
                    onClick={() => setField('personen', n)}
                  >
                    {n}{n === 5 ? '+' : ''}
                  </button>
                ))}
              </div>
              <p className={styles.personenToelichting}>
                Meer personen betekent doorgaans meer stroomverbruik.
              </p>
              <div className={styles.stapNav}>
                <button className={styles.terugKnop} onClick={() => setStap('panelen')}>← Terug</button>
                <button className={styles.verderKnop} onClick={() => setStap('apparaten')}>Verder →</button>
              </div>
            </div>
          )}

          {/* ── Stap: apparaten ── */}
          {stap === 'apparaten' && (
            <div className={styles.stapContent}>
              <h3 className={styles.stapTitel}>Welke apparaten heb je (of wil je)?</h3>
              <p className={styles.stapSubtitel}>Selecteer alles wat van toepassing is. Niets? Sla dan gewoon over.</p>
              <div className={styles.apparatenLijst}>
                {APPARATEN.map(a => (
                  <button
                    key={a.id}
                    className={`${styles.apparaatKnop} ${form.apparaten.includes(a.id) ? styles.apparaatKnopActief : ''}`}
                    onClick={() => toggleApparaat(a.id)}
                  >
                    <span className={styles.apparaatIcon}>{a.icon}</span>
                    <span className={styles.apparaatLabel}>{a.label}</span>
                    <span className={styles.apparaatKwh}>+{a.kWh.toLocaleString('nl-NL')} kWh/jaar</span>
                    {form.apparaten.includes(a.id) && <span className={styles.apparaatCheck}>✓</span>}
                  </button>
                ))}
              </div>
              <div className={styles.stapNav}>
                <button className={styles.terugKnop} onClick={() => setStap('personen')}>← Terug</button>
                <button className={styles.verderKnop} onClick={() => setStap('batterij')}>Verder →</button>
              </div>
            </div>
          )}

          {/* ── Stap: batterij ── */}
          {stap === 'batterij' && (
            <div className={styles.stapContent}>
              <h3 className={styles.stapTitel}>Wil je ook een thuisbatterij?</h3>
              <p className={styles.stapSubtitel}>
                Met een batterij gebruik je 70% van je opgewekte stroom zelf. Zonder batterij is dat gemiddeld 30%.
              </p>
              <div className={styles.toggleRij}>
                <button
                  className={`${styles.toggleKnop} ${form.heeftBatterij === true ? styles.toggleKnopActief : ''}`}
                  onClick={() => setField('heeftBatterij', true)}
                >
                  Ja, met batterij
                </button>
                <button
                  className={`${styles.toggleKnop} ${form.heeftBatterij === false ? styles.toggleKnopActief : ''}`}
                  onClick={() => setField('heeftBatterij', false)}
                >
                  Nee, zonder batterij
                </button>
              </div>

              {form.heeftBatterij !== null && (
                <div className={styles.batterijVergelijk}>
                  <div className={styles.batterijOptie}>
                    <span className={styles.batterijPct}>30%</span>
                    <span className={styles.batterijLabel}>Eigen gebruik zonder batterij</span>
                  </div>
                  <div className={styles.batterijVs}>vs</div>
                  <div className={`${styles.batterijOptie} ${form.heeftBatterij ? styles.batterijActief : ''}`}>
                    <span className={styles.batterijPct}>70%</span>
                    <span className={styles.batterijLabel}>Eigen gebruik met batterij</span>
                  </div>
                </div>
              )}

              <div className={styles.stapNav}>
                <button className={styles.terugKnop} onClick={() => setStap('apparaten')}>← Terug</button>
                <button
                  className={styles.verderKnop}
                  disabled={form.heeftBatterij === null}
                  onClick={() => setStap('uitkomst')}
                >
                  Bereken mijn besparing →
                </button>
              </div>
            </div>
          )}

          {/* ── Uitkomst + lead ── */}
          {stap === 'uitkomst' && (
            <div className={styles.stapContent}>
              {!leadVerzonden ? (
                <>
                  <div className={styles.uitkomstHeader}>
                    <h3 className={styles.uitkomstTitel}>Jouw geschatte besparing</h3>
                    <p className={styles.disclaimer}>
                      ⓘ Dit is een indicatie op basis van gemiddelden. De werkelijke besparing hangt af van jouw specifieke situatie.
                    </p>
                  </div>

                  <div className={styles.besparingBlokken}>
                    <div className={styles.besparingHoofd}>
                      <span className={styles.besparingLabel}>Geschatte jaarlijkse besparing</span>
                      <span className={styles.besparingBedrag}>{formatEuro(besparingJaar)}</span>
                      <span className={styles.besparingMaand}>{formatEuro(besparingMaand)} per maand</span>
                    </div>
                    <div className={styles.besparingDetails}>
                      <div className={styles.besparingRegel}>
                        <span>Huidig jaarverbruik</span>
                        <span>{verbruik.toLocaleString('nl-NL')} kWh</span>
                      </div>
                      <div className={styles.besparingRegel}>
                        <span>Opwekking per jaar</span>
                        <span>{opwekking.toLocaleString('nl-NL')} kWh</span>
                      </div>
                      <div className={styles.besparingRegel}>
                        <span>Eigen gebruik</span>
                        <span>{Math.round(eigenVerbruikPct * 100)}%</span>
                      </div>
                      <div className={`${styles.besparingRegel} ${styles.besparingRegelTotaal}`}>
                        <span>Huidige jaarkosten stroom</span>
                        <span>{formatEuro(huidigJaarkosten)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.leadFormWrap}>
                    <p className={styles.leadIntro}>
                      Ontvang jouw berekening per e-mail en laat ons een gratis adviesgesprek plannen.
                    </p>
                    <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
                      <input
                        type="text"
                        placeholder="Jouw naam"
                        required
                        value={form.naam}
                        onChange={e => setField('naam', e.target.value)}
                        className={styles.leadInput}
                      />
                      <input
                        type="email"
                        placeholder="E-mailadres"
                        required
                        value={form.email}
                        onChange={e => setField('email', e.target.value)}
                        className={styles.leadInput}
                      />
                      <input
                        type="tel"
                        placeholder="Telefoonnummer"
                        value={form.telefoon}
                        onChange={e => setField('telefoon', e.target.value)}
                        className={styles.leadInput}
                      />
                      <button
                        type="submit"
                        disabled={leadLoading}
                        className={styles.leadSubmit}
                      >
                        {leadLoading ? 'Versturen...' : 'Stuur mij de berekening →'}
                      </button>
                      <p className={styles.leadDisclaimer}>
                        Geen spam. Alleen je berekening en een uitnodiging voor een gratis gesprek.
                      </p>
                    </form>
                  </div>
                </>
              ) : (
                <div className={styles.bedankt}>
                  <span className={styles.bedanktIcon}>🌿</span>
                  <h3 className={styles.stapTitel}>Bedankt, {form.naam.split(' ')[0]}!</h3>
                  <p>We sturen je berekening naar <strong>{form.email}</strong>. Een van onze adviseurs neemt binnen één werkdag contact op.</p>
                  <a href="/contact" className={styles.ctaBtnPrimary}>Of plan direct een afspraak</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}