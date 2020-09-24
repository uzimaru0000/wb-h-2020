import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>プリティ</h1>
        <h2 className={styles.tagline}>Please + community</h2>
        <div className={styles.grid}>
          <a href="/register" className={styles.card}>
            <h3>個人登録 &rarr;</h3>
          </a>

          <a href="/request" className={styles.card}>
            <h3>人を探す &rarr;</h3>
          </a>

          <a href="/list" className={styles.card}>
            <h3>Map &rarr;</h3>
          </a>
        </div>
      </main>
    </div>
  );
}
