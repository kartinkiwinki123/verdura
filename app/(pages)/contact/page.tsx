'use client';

import { useState } from 'react';
import styles from './page.module.css';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const services = [
  'Zonnepanelen',
  'Thuisbatterij',
  'Warmtepomp',
  'Laadpaal',
  'Combinatiepakket',
  'Anders / Ik weet het nog niet',
];

const gemeenten = [
  'Amsterdam',
  'Amstelveen',
  'Zaandam',
  'Haarlem',
  'Almere',
  'Utrecht',
  'Anders',
];

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name:     (form.elements.namedItem('name') as HTMLInputElement).value,
      email:    (form.elements.namedItem('email') as HTMLInputElement).value,
      phone:    (form.elements.namedItem('phone') as HTMLInputElement).value,
      gemeente: (form.elements.namedItem('gemeente') as HTMLSelectElement).value,
      service:  (form.elements.namedItem('service') as HTMLSelectElement).value,
      message:  (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? 'Er ging iets mis. Probeer het opnieuw.');
      }

      setFormState('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Onbekende fout.');
      setFormState('error');
    }
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="label-tag" style={{ color: 'var(--green-mid)' }}>
              Contact
            </span>
            <h1 className={`display-lg ${styles.heroTitle}`}>
              Plan uw gratis adviesgesprek
            </h1>
            <p className={`body-lg ${styles.heroSub}`}>
              Vul het formulier in en wij nemen binnen één werkdag contact met u op.
              Geen verplichtingen, altijd vrijblijvend.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className={`container ${styles.mainGrid}`}>

          {/* Left: Info */}
          <aside className={styles.infoSide}>
            <div className={`card ${styles.infoCard}`}>
              <h2 className={`display-md ${styles.infoTitle}`}>Waarom Verdura?</h2>

              <ul className={styles.infoList}>
                {[
                  { icon: '✅', text: 'Gecertificeerde installateurs' },
                  { icon: '🏛️', text: 'Wij regelen de subsidieaanvraag' },
                  { icon: '📋', text: 'Transparante offertes, geen verborgen kosten' },
                  { icon: '🔧', text: '5 jaar garantie op alle installaties' },
                  { icon: '📞', text: 'Altijd bereikbaar voor vragen' },
                ].map(({ icon, text }) => (
                  <li key={text} className={styles.infoItem}>
                    <span className={styles.infoIcon}>{icon}</span>
                    <span className={`body-md ${styles.infoText}`}>{text}</span>
                  </li>
                ))}
              </ul>

              <hr className="divider" />

              <div className={styles.contactDetails}>
                <div className={styles.contactDetail}>
                  <span className={styles.contactDetailIcon}>📧</span>
                  <span>info@verdura.nl</span>
                </div>
                <div className={styles.contactDetail}>
                  <span className={styles.contactDetailIcon}>📞</span>
                  <span>+31 20 000 0000</span>
                </div>
                <div className={styles.contactDetail}>
                  <span className={styles.contactDetailIcon}>🕐</span>
                  <span>Ma &mdash; Vr: 08:00 &ndash; 18:00</span>
                </div>
              </div>
            </div>

            <div className={styles.subsidieHint}>
              <span className="badge badge-amber">💡 Subsidie tip</span>
              <p className={`body-sm ${styles.subsidieHintText}`}>
                Veel gemeenten hebben nog budget beschikbaar voor 2025.
                Vraag snel aan, want het is op is op.
              </p>
            </div>
          </aside>

          {/* Right: Form */}
          <div className={styles.formSide}>
            {formState === 'success' ? (
              <div className={`card ${styles.successCard}`}>
                <span className={styles.successIcon}>🌿</span>
                <h2 className="display-md">Bedankt voor uw aanvraag!</h2>
                <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
                  We nemen binnen één werkdag contact met u op om een afspraak in te plannen.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => setFormState('idle')}
                >
                  Nog een aanvraag indienen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`card ${styles.form}`} noValidate>
                <h2 className={`heading ${styles.formTitle}`}>Uw gegevens</h2>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Volledige naam *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jan de Vries"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mailadres *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jan@voorbeeld.nl"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefoonnummer</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+31 6 00 00 00 00"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gemeente" className="form-label">Uw gemeente</label>
                    <select id="gemeente" name="gemeente" className="form-select">
                      <option value="">Selecteer gemeente</option>
                      {gemeenten.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">Interesse in *</label>
                  <select id="service" name="service" required className="form-select">
                    <option value="">Selecteer dienst</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Uw vraag of situatie *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Vertel ons kort over uw woning en wat u wilt bereiken..."
                    className="form-textarea"
                  />
                </div>

                {formState === 'error' && (
                  <div className={styles.errorMsg}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                >
                  {formState === 'loading' ? 'Verzenden...' : 'Verstuur aanvraag →'}
                </button>

                <p className={`body-sm ${styles.formDisclaimer}`}>
                  Uw gegevens worden alleen gebruikt voor het beantwoorden van uw aanvraag
                  en nooit gedeeld met derden.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
