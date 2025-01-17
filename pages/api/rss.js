export default async function handler(req, res) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    const apiEndpoint = "http://localhost:5000/api/posts/articles";

    try {
        // Fetch articles from the external API
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }
        const data = await response.json();

        // Remove special characters from strings
        const sanitize = (str) => str.replace(/[^a-zA-Z0-9\s]/g, "");

        // Map API articles to the expected RSS format and sanitize fields
        const articles = data.articles.map((article) => ({
            title: sanitize(article.title),
            description: sanitize(article.description || article.title), // Default to title if description is missing
            link: article.link,
            pubDate: new Date(article.pubDate).toUTCString(), // Ensure proper format
            publicationDate: article.publicationDate,
            category: article.category,
        }));

        // Generate RSS feed with Google News namespace
        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
            <channel>
                <title>Uspupils</title>
                <link>${baseUrl}</link>
                <description>Latest news and updates from Uspupils</description>
                <language>en-us</language>
                ${articles
                    .map(
                        (article) => `
                <item>
                    <title>${article.title}</title>
                    <description>${article.description}</description>
                    <link>${article.link}</link>
                    <pubDate>${article.pubDate}</pubDate>
                    <news:news>
                        <news:publication>
                            <news:name>Uspupils</news:name>
                            <news:language>en</news:language>
                        </news:publication>
                        <news:publication_date>${article.publicationDate}</news:publication_date>
                        <news:title>${article.title}</news:title>
                        <news:keywords>${article.category}</news:keywords>
                    </news:news>
                </item>
                `
                    )
                    .join("")}
            </channel>
        </rss>`;

        // Set response headers
        res.setHeader("Content-Type", "application/rss+xml");
        res.status(200).send(rss);
    } catch (error) {
        console.error("Error generating RSS feed:", error);
        res.status(500).json({ error: "Failed to generate RSS feed" });
    }
}
