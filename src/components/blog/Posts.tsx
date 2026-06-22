import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  include?: string[]; // when set, show only these slugs, in this exact order
  pinnedFirst?: boolean; // when true, posts with a `priority` frontmatter are listed first
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  include,
  direction,
  pinnedFirst = false,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  // Curated selection: only the given slugs, preserving the requested order
  if (include && include.length) {
    const bySlug = new Map(allBlogs.map((p) => [p.slug, p]));
    const curated = include.map((slug) => bySlug.get(slug)).filter(Boolean) as typeof allBlogs;
    return (
      <>
        {curated.length > 0 && (
          <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
            {curated.map((post) => (
              <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
            ))}
          </Grid>
        )}
      </>
    );
  }

  // Exclude by slug (exact match)
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    if (pinnedFirst) {
      const pa = a.metadata.priority;
      const pb = b.metadata.priority;
      const hasA = typeof pa === "number";
      const hasB = typeof pb === "number";
      if (hasA && hasB && pa !== pb) return (pa as number) - (pb as number);
      if (hasA !== hasB) return hasA ? -1 : 1;
    }
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
