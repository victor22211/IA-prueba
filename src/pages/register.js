import Link from 'next/link';
import styles from '../styles/Auth.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Nombre de usuario" className={styles.input} />
          <input type="email" placeholder="Correo electrónico" className={styles.input} />
          <input type="password" placeholder="Contraseña" className={styles.input} />
          <button type="submit" className={styles.button}>
            Registrarse
          </button>
        </form>
        <div className={styles.or}>
          <span>o</span>
        </div>
        <button className={styles.googleButton}>
          Registrarse con Google
        </button>
        <p className={styles.link}>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login">
            <a>Inicia sesión</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
