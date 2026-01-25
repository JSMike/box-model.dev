import { NavLink } from 'react-router-dom';
import { STORYBOOK_URL } from './config';
import LogoMark from './logo';
import styles from './app-nav.module.scss';

export function AppNav() {
  return (
    <header className={styles.nav}>
      <NavLink to="/" end className={styles.brand}>
        <LogoMark width={20} height={20} aria-hidden="true" focusable="false" />
        <span>Box Model UI</span>
      </NavLink>
      <nav className={styles.links}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          Home
        </NavLink>
        <NavLink to="/about" end className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          About
        </NavLink>
        <NavLink to="/blogs" end className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          Developer Blog
        </NavLink>
        <a href={STORYBOOK_URL} target="_blank" rel="noreferrer" className={styles.link}>
          Storybook
        </a>
      </nav>
    </header>
  );
}
