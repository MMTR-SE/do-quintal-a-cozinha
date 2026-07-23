interface PageHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Reusable page header component with simple styling.
 *
 * Provides consistent header styling across pages with:
 * - Full-width background image with dark scrim overlay for readability
 * - Centered title and subtitle text
 * - Clean, accessible design
 * - Good contrast for readability
 *
 * @param title - Main heading text
 * @param subtitle - Descriptive text below the title
 */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" />
      {/* Dark scrim for consistent text contrast regardless of background image */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-4xl font-bold text-gray-900 text-center leading-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
