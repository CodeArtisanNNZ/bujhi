import styles from "./cup-steam.module.css";

export default function CupSteam({drink}:{drink:string}){
  // The tea artwork already contains a steam plume; avoid adding a duplicate.
  if(drink!=="coffee")return null;
  return <svg className={styles.steam} viewBox="0 0 480 480" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <path className={styles.wisp} d="M214 136C194 117 235 100 217 79S204 45 218 25"/>
    <path className={`${styles.wisp} ${styles.second}`} d="M268 132C288 111 247 96 266 73S278 42 268 20"/>
  </svg>;
}
