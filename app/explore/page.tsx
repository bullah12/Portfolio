import type { Metadata } from "next";
import { ExploreGraph } from "./ExploreGraph";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Explore the data-engineering graph",
  description: "An interactive, anonymised map of the technologies, sectors and delivery work behind Abdullah Taj’s data-engineering experience.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Follow the signal — stack to sector to impact",
    description: "Explore an anonymised map of data-engineering technologies, sectors and delivered work.",
    images: [{ url: "/explore-og.png", width: 1731, height: 909, alt: "Follow the signal — an anonymised data-engineering relationship graph" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Follow the signal — stack to sector to impact",
    description: "Explore an anonymised map of data-engineering technologies, sectors and delivered work.",
    images: ["/explore-og.png"],
  },
};

export default function ExplorePage() {
  return (
    <main id="main-content" className="explore-page">
      <section className="explore-intro section-shell" aria-labelledby="explore-title">
        <div>
          <p className="eyebrow">Interactive knowledge graph / anonymised delivery</p>
          <h1 id="explore-title">Follow the signal<br />from <em>stack to impact.</em></h1>
        </div>
        <div className="explore-intro-copy">
          <p>Explore how production data technologies connect to sector experience and the work delivered inside each environment. Every organisation is represented only by sector and approximate scale.</p>
          <p className="explore-privacy"><span aria-hidden="true" /> client identities intentionally withheld</p>
        </div>
      </section>

      <section className="explore-graph-shell section-shell" aria-labelledby="graph-title">
        <div className="graph-heading">
          <div><p className="eyebrow" id="graph-title">{"// relationship workspace"}</p><span>40 nodes · 50 connections</span></div>
          <div className="graph-legend" aria-label="Graph legend">
            <span><i className="legend-node legend-technology" aria-hidden="true" /> Technology</span>
            <span><i className="legend-node legend-sector" aria-hidden="true" /> Sector</span>
            <span><i className="legend-node legend-work" aria-hidden="true" /> Work</span>
            <span><i className="legend-line legend-used" aria-hidden="true" /> used within</span>
            <span><i className="legend-line legend-delivered" aria-hidden="true" /> delivered</span>
            <span><i className="legend-line legend-related" aria-hidden="true" /> works with</span>
          </div>
        </div>
        <ExploreGraph />
      </section>
    </main>
  );
}
