import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.PRODUCTION_BASE_URL!;
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/order`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // {
    //   url: `${baseUrl}/order/success`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly" as const,
    //   priority: 0.3,
    // },
    // {
    //   url: `${baseUrl}/order/failure`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly" as const,
    //   priority: 0.3,
    // },
  ];

  // Dynamic routes for admin dashboard (if needed for SEO)
  //   const adminRoutes = [
  //     {
  //       url: `${baseUrl}/admin/dashboard`,
  //       lastModified: new Date(),
  //       changeFrequency: "monthly" as const,
  //       priority: 0.1, // Low priority as it's admin only
  //     },
  //   ];

  // Combine all routes
  return [...staticRoutes];
}
