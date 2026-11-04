// Newspaper-style section header used on inner pages.
export function PageHeader({ kicker, title, intro }: { kicker?: string; title: string; intro?: string }) {
  return (
    <div className="container mx-auto px-4 lg:px-8 pt-8">
      <div className="border-b-2 border-foreground/90 pb-5">
        {kicker && <div className="kicker">{kicker}</div>}
        <h1 className="headline text-4xl lg:text-5xl mt-2 leading-tight">{title}</h1>
        {intro && <p className="text-lg text-muted-foreground mt-3 max-w-3xl">{intro}</p>}
      </div>
    </div>
  );
}
