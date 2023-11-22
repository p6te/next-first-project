import matter from "gray-matter";
import { marked } from "marked";
import { readFile } from "node:fs/promises";

export interface Review {
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, image, date },
  } = matter(text);
  const body = marked(content);

  return { title, image, date, body };
}
