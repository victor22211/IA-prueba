import Link from 'next/link';
import styles from '../styles/Auth.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <form className={styles.form}>
          <input type="email" placeholder="Correo electrónico" className={styles.input} />
          <input type="password" placeholder="Contraseña" className={styles.input} />
          <button type="submit" className={styles.button}>
            Acceder
          </button>
        </form>
        <div className={styles.or}>
          <span>o</span>
        </div>
        <button className={styles.googleButton}>
          Iniciar sesión con Google
        </button>
        <p className={styles.link}>
          ¿No tienes una cuenta?{' '}
          <Link href="/register">
            <a>Regístrate</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
