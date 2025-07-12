import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a <a href="#">Nexus IA</a>
        </h1>

        <p className={styles.description}>
          Experimenta el futuro de la conversación con una IA de vanguardia.
        </p>

        <Link href="/login" passHref>
          <button className={styles.button}>Empezar a probar ya</button>
        </Link>
      </main>
    </div>
  );
}
