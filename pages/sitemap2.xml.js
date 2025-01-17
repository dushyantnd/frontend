import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uspupils.com";

  const dynamicPaths = [
    { url: "/product/1", lastModified: "2025-01-01" },
    { url: "/product/2", lastModified: "2025-01-02" },
    { url: "/product/1", lastModified: "2025-01-01" },
    { url: "/product/2", lastModified: "2025-01-02" },
    { url: "/product/1", lastModified: "2025-01-01" },
    { url: "/product/2", lastModified: "2025-01-02" },
    { url: "/product/1", lastModified: "2025-01-01" },
    { url: "/product/2", lastModified: "2025-01-02" },
    { url: "/product/1", lastModified: "2025-01-01" },
    { url: "/product/2", lastModified: "2025-01-02" },
    { url: "/product/1", lastModified: "2025-01-01" },
    { url: "/product/2", lastModified: "2025-01-02" },
  ];

  const staticPaths = [
    { url: "/", lastModified: "2025-01-10" },
    { url: "/about", lastModified: "2025-01-10" },
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path.url}</loc>
      <lastmod>${path.lastModified}</lastmod>
    </url>
  `
    )
    .join("")}
</urlset>`;

  const sitemapPath = path.join(process.cwd(), "public", "sitemap2.xml");
  fs.writeFileSync(sitemapPath, sitemap);

  return { props: {} };
}

export default function Sitemap2() {
  return null; // Sitemap is pre-generated in `public/sitemap.xml`
}
