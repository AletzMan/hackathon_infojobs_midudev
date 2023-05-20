import { Logo } from "./Logo";
import styles from "./header.module.css";
import Link from "next/link";
import { links, Menu } from "../constants";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={links[0].route}>
          <Logo />
        </Link>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.id}>
              <Link className={styles.link} href={link.route}>
                <link.icon />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <Menu />
      </nav>
    </header>
  );
}
