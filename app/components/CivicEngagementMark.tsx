import styles from "./CivicEngagementMark.module.css";

// Text-only, theme-aware lockup shared by the navbar and homepage footer.
export default function CivicEngagementMark() {
  return (
    <span className={styles.mark} data-no-translate>
      <span className={styles.wordmark}>
        <strong className={styles.name}>Civic</strong>
        <span className={styles.subtitle}>Engagement Cell</span>
      </span>
    </span>
  );
}
