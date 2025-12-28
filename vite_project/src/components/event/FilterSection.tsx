type FilterSectionProps = {
    title: string;
    isResolved: boolean;
    summary?: string;
    onEdit?: () => void;
    children: React.ReactNode;
};

export function FilterSection({
      title,
      isResolved,
      summary,
      onEdit,
      children,
  }: FilterSectionProps) {
    if (isResolved) {
        return (
            <div className="filter-summary">
                <strong>{title}:</strong> {summary}
                <button
                    type="button"
                    className="filter-edit"
                    onClick={onEdit}
                    aria-label={`Edit ${title}`}
                >
                    ✎
                </button>
            </div>
        );
    }

    return (
        <section className="filter-group">
            <h3>{title}</h3>
            {children}
        </section>
    );
}
