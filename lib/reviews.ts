import { marked } from "marked";
import { readdir } from "node:fs/promises";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
}

export interface FullReview extends Review {
  body: string;
}

interface ResponseReviewsData {
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
}

interface ResponseReviewData extends ResponseReviewsData {
  body: string;
}

export async function getReview(slug: string): Promise<FullReview> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    );
  console.log("getReview:", url);
  const response = await fetch(url);
  const { data } = await response.json();
  const { attributes }: { attributes: ResponseReviewData } = data[0];
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
    body: marked(attributes.body),
  };
}

export async function getReviews(): Promise<Review[]> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 6 },
      },
      { encodeValuesOnly: true }
    );

  const response = await fetch(url);

  const { data } = await response.json();

  return data.map(({ attributes }: { attributes: ResponseReviewsData }) => ({
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
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
