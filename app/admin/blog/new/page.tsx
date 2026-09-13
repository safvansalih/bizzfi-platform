"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState("DRAFT");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          coverImage,
          category,
          seoTitle,
          seoDescription,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create blog post"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/blog"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Blog Management
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-zinc-900">
            Create New Blog Post
          </h1>

          <p className="mt-2 text-sm text-zinc-600">
            Add a new article to the Bizzfi blog.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={200}
              placeholder="Enter blog title"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Excerpt
            </label>

            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Short summary of the article"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Content *
            </label>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              rows={14}
              placeholder="Write your blog content here..."
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Cover Image URL
            </label>

            <input
              type="url"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              maxLength={100}
              placeholder="Technology, Business, CCTV..."
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                SEO Title
              </label>

              <input
                type="text"
                value={seoTitle}
                onChange={(event) => setSeoTitle(event.target.value)}
                maxLength={200}
                placeholder="SEO title"
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                SEO Description
              </label>

              <textarea
                value={seoDescription}
                onChange={(event) =>
                  setSeoDescription(event.target.value)
                }
                maxLength={320}
                rows={3}
                placeholder="SEO description"
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Status
            </label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/admin/blog"
              className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Create Blog Post"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}