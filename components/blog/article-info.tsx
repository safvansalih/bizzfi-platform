import { CalendarDays, Clock3, Tag } from "lucide-react";

type ArticleInfoProps = {
  category: string;
  date: string;
  readingTime: string;
};

export function ArticleInfo({
  category,
  date,
  readingTime,
}: ArticleInfoProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <Tag className="h-4 w-4" aria-hidden="true" />
        </div>

        <div>
          <span className="block text-xs text-muted-foreground">
            Category
          </span>

          <span className="mt-0.5 block text-sm font-medium text-foreground">
            {category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
        </div>

        <div>
          <span className="block text-xs text-muted-foreground">
            Published
          </span>

          <span className="mt-0.5 block text-sm font-medium text-foreground">
            {date}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
        </div>

        <div>
          <span className="block text-xs text-muted-foreground">
            Reading Time
          </span>

          <span className="mt-0.5 block text-sm font-medium text-foreground">
            {readingTime}
          </span>
        </div>
      </div>
    </div>
  );
}