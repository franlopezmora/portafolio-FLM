export default function SectionHeading({ title, description, action, as = "h2" }) {
  const Heading = as;

  return (
    <div className="flex flex-col gap-3 border-b border-neutral-200/80 pb-5 dark:border-neutral-800 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[62ch]">
        <Heading className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl">
          {title}
        </Heading>
        {description && (
          <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400 sm:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
