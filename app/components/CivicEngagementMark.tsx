import {useId} from "react";
import styles from "./CivicEngagementMark.module.css";

// Use the original letter shapes as a mask so the reference font is preserved.
export default function CivicEngagementMark() {
  const id=useId().replace(/:/g, "");
  const filterId=`civic-ink-${id}`;
  const maskId=`civic-mask-${id}`;
  return (
    <span className={styles.mark} data-no-translate>
      <svg className={styles.wordmark} viewBox="250 425 1200 820" role="img" aria-label="Civic Engagement Cell">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.36142 -1.21584 -0.12274 0 1.5"/>
          </filter>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="250" y="425" width="1200" height="820" style={{maskType:"alpha"}}>
            <image href="/civic-engagement-cell.jpg" width="1534" height="1536" filter={`url(#${filterId})`}/>
          </mask>
        </defs>
        <path d="M250 425h1200v820H250z" fill="currentColor" mask={`url(#${maskId})`}/>
      </svg>
    </span>
  );
}
