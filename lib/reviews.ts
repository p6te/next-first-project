import matter from "gray-matter";
import { marked } from "marked";
import { readFile, readdir } from "node:fs/promises";
import qs from "qs";

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, image, date },
  } = matter(text);
  const body = marked(content);

  return { title, image, date, body, slug };
}

type Data = {
  id: string;
  attributes: {
    slug: string;
    title: string;
    subtitle: string;
    publishedAt: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}[];
export async function getReviews(): Promise<Review[]> {
  const url =
    "http://localhost:1337/api/reviews?" +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 6 },
      },
      { encodeValuesOnly: true }
    );
  console.log("getReviews:", url);
  const response = await fetch(url);
  const { data: Data } = await response.json();
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}

export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}
