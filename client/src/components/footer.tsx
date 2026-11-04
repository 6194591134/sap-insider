import { Link } from "wouter";

const sections = [
  { title: "Coverage", links: [["Regulatory Updates", "/updates"], ["RTD Guide", "/rtd"], ["Resources", "/resources"]] },
  { title: "Directory", links: [["Provider Reviews", "/reviews"], ["Organizations", "/organizations"]] },
  { title: "About", links: [["About The SAP Insider", "/about"]] },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground/90 mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-serif font-bold text-2xl">The SAP Insider</div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Independent coverage of DOT drug and alcohol compliance, drawn from official agency sources.
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title}>
            <div className="text-xs font-bold uppercase tracking-[0.14em] mb-3">{s.title}</div>
            <ul className="space-y-2 text-sm">
              {s.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-muted-foreground hover:text-foreground">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 lg:px-8 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} The SAP Insider. Updates link to official sources. Always confirm requirements with the governing agency. Photos from Unsplash.
        </div>
      </div>
    </footer>
  );
}
