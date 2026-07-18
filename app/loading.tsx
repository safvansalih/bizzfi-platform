export default function Loading() {
  return (
    <section
      className="flex min-h-[60vh] items-center justify-center px-6 py-20"
      aria-label="Loading page"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        {/* Spinner */}
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-blue-500"
          aria-hidden="true"
        />

        {/* Loading Text */}
        <p className="mt-5 text-sm font-medium text-muted-foreground">
          Loading...
        </p>
      </div>
    </section>
  );
}