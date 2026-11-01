import styles from "./CivicEngagementMark.module.css";

// Shared, theme-aware lockup for the navbar and the homepage footer.
export default function CivicEngagementMark() {
  return (
    <span className={styles.mark} role="img" aria-label="Civic Engagement Cell" data-no-translate>
      <span className={styles.artwork} aria-hidden="true">
        <img
          src="/civic-engagement-cell.jpg"
          width="1534"
          height="1536"
          alt=""
          decoding="async"
        />
      </span>
      <span className={styles.wordmark} aria-hidden="true">
        <strong className={styles.name}>Civic</strong>
        <span className={styles.subtitle}>Engagement Cell</span>
      </span>
    </span>
  );
}
