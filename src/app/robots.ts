import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/dashboard"],
      },
    ],
    sitemap: `${process.env.PRODUCTION_BASE_URL}/sitemap.xml`,
  };
}
