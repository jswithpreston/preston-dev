interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2 pb-8 pt-6">
      <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-[68ch] text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
