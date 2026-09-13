"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  status: string;
  createdAt: string;
  publishedAt: string | null;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/blog");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load blog posts");
      }

      setPosts(data.posts || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load blog posts"
      );
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete blog post");
      }

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== id)
      );
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Unable to delete blog post"
      );
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Bizzfi Admin
            </p>

            <h1 className="mt-1 text-3xl font-bold text-zinc-900">
              Blog Management
            </h1>

            <p className="mt-2 text-sm text-zinc-600">
              Create, edit and manage your blog posts.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + New Blog Post
          </Link>
        </div>

        {loading && (
          <div className="rounded-xl bg-white p-6 text-sm text-zinc-600 shadow-sm">
            Loading blog posts...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">
              No blog posts yet
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              Create your first blog post to get started.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-zinc-100 text-zinc-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Title</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Created</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-zinc-900">
                          {post.title}
                        </div>

                        <div className="mt-1 text-xs text-zinc-500">
                          /blog/{post.slug}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-zinc-600">
                        {post.category || "Uncategorized"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            post.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-zinc-600">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => deletePost(post.id)}
                            className="font-medium text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}