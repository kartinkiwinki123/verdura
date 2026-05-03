'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { CactusIcon } from '@phosphor-icons/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/subsidie', label: 'Subsidie' },
  { href: '/ons-team', label: 'Ons Team' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [pendingHref, setPendingHreft] = useState<string | null>(null);

  //Zodra de route veranderd stopt de loader
  useEffect(() => {
    setLoading(false);
    setPendingHreft(null);
  } , [pathname]);

  function handleClick(href: string) {
    if (href === pathname) return;
    setLoading(false);
    setPendingHreft(null);
  }

  return (
    <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <Link href="/" className={styles.logo} onClick={() => handleClick('/')}>
            <CactusIcon size={20} weight="bold" />
            <span className={styles.logoText}>VERDURA</span>
          </Link>

          <ul className={styles.links}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => handleClick(href)}
                  className={`${styles.link} ${pathname === href ? styles.linkActive : ''} ${pendingHref === href ? styles.linkLoading : ''}`}
                >
                  {pendingHref === href && <span className={styles.linkSpinner} />}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            onClick={() => handleClick('/contact')}
            className={`btn btn-primary ${styles.ctaBtn}`}
          >
            Offerte aanvragen
          </Link>
        </nav>
      </header>
  );
}
