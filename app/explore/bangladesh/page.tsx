"use client";

import BangladeshMapPreview from "../../components/BangladeshMapPreview";

export default function BangladeshExplorerPage(){
  return <main className="bangladesh-explorer-page">
    <section className="bangladesh-explorer-hero">
      <p className="eyebrow">Bangladesh interactive atlas</p>
      <h1>One country. Many places. More than one story.</h1>
      <p>Start with a division, drill into its districts, then switch between geography, history and culture to see how the same place can be understood from different angles.</p>
    </section>
    <section className="bangladesh-explorer-wrap">
      <BangladeshMapPreview/>
    </section>
  </main>;
}
