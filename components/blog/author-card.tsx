import { UserRound } from "lucide-react";

type AuthorCardProps = {
  author: string;
};

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-muted/30 p-6 sm:flex-row sm:items-center">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500">
        <UserRound className="h-6 w-6" aria-hidden="true" />
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
          Written By
        </span>

        <h3 className="mt-1 text-lg font-semibold text-foreground">
          {author}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Insights and perspectives from Bizzfi on technology, digital
          transformation and modern business solutions.
        </p>
      </div>
    </div>
  );
}