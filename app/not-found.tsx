import Link from "next/link";

export default function NotFound() { return <main className="not-found" id="main-content"><p className="eyebrow">404 / Thread interrupted</p><h1>This route didn’t<br /><em>make the model.</em></h1><p>The page may have moved, or the path never existed. The project index is a reliable place to resume.</p><Link className="button button-primary" href="/projects">Return to projects →</Link></main>; }
