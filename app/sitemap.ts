import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://cromoforge.dev/", changeFrequency: "monthly", priority: 1 },
    { url: "https://cromoforge.dev/changelog/", changeFrequency: "weekly", priority: 0.5 },
  ];
}
