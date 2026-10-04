import type { MetadataRoute } from "next";
import { EVENTS } from "@/lib/events";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...EVENTS.map((e) => ({
      url: `${SITE.url}/eventos/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
