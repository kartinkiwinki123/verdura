import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>🌿</span>
            <span className={styles.logoText}>Verdura</span>
          </div>
          <p className={styles.tagline}>
            Duurzame energie voor uw thuis.<br />
            Professionele installatie, eerlijk advies.
          </p>
        </div>

        {/* Links */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Diensten</p>
          <ul className={styles.colLinks}>
            <li><Link href="/diensten#zonnepanelen">Zonnepanelen</Link></li>
            <li><Link href="/diensten#thuisbatterijen">Thuisbatterijen</Link></li>
            <li><Link href="/diensten#warmtepomp">Warmtepompen</Link></li>
            <li><Link href="/diensten#laadpaal">Laadpalen</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Informatie</p>
          <ul className={styles.colLinks}>
            <li><Link href="/subsidie">Gemeentelijke subsidie</Link></li>
            <li><Link href="/over-ons">Over Verdura</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Contact</p>
          <ul className={styles.colLinks}>
            <li>info@verdura.nl</li>
            <li>+31 20 000 0000</li>
            <li>Amsterdam, Nederland</li>
          </ul>
        </div>

      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Verdura. Alle rechten voorbehouden.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy">Privacybeleid</Link>
          <Link href="/voorwaarden">Algemene voorwaarden</Link>
        </div>
      </div>
    </footer>
  );
}
