import BlurImage from "@/components/BlurImage";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import MarkdownSyntaxHighlighter from "@/components/ReactMarkdownSyntaxHighlighter";
import SharePost from "@/components/SharePost";
import siteConfig from "@/config/site.config.json";
import { getPosts, getPostBySlug } from "@/libs/getPosts";
import { getRelatedPosts } from "@/libs/getRelatedPosts";
import { useScript } from "@/libs/useScript";
import { ArrowUpRight, Calender, Clock } from "@/utils/Icons";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PostPage({
  slug,
  currentPost,
}) {
  const router = useRouter();
  const { category } = router.query;
  const pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;

  const jsonLdNewsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": currentPost?.data?.title || "Title of a News Article",
    "image": [
      currentPost?.data?.featured_image || "https://example.com/photos/default.jpg"
    ],
    "datePublished": currentPost?.data?.createdAt,
    "dateModified": currentPost?.data?.updatedAt || currentPost?.data?.createdAt,
    "author": [
      {
        "@type": "Person",
        "name": currentPost?.data?.author || "Default Author",
        "url": `${siteConfig.baseURL}/authors/${slugify(currentPost?.data?.author || "default-author")}`
      }
    ]
  };

  const jsonLdBreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.baseURL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category,
        "item": `${siteConfig.baseURL}/${slugify(category)}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentPost?.data?.title
      }
    ]
  };

  const jsonLdImageObject = {
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    "contentUrl": currentPost?.data?.featured_image || "https://example.com/photos/default.jpg",
    "license": `${siteConfig.baseURL}/license`,
    "acquireLicensePage": `${siteConfig.baseURL}/how-to-use-images`,
    "creditText": "Default Credit",
    "creator": {
      "@type": "Person",
      "name": currentPost?.data?.author || "Default Author"
    },
    "copyrightNotice": currentPost?.data?.author || "Default Author"
  };

  return (
    <Layout
      metaTitle={currentPost?.data?.meta_title}
      metaDescription={currentPost?.data?.meta_desc}
      ogImage={currentPost?.data?.featured_image}
    >
      <section className="bg-body">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="section">
                <div className="post-author d-flex flex-wrap align-items-center">
                  <Link className="text-link" href={`/`}>Home</Link>
                  <span className="mx-2">/</span>
                  <Link className="text-link" href={`/${slugify(category)}`}>{category}</Link>
                  <span className="mx-2">/</span>
                  <Link className="text-link" href="#" onClick={(e) => e.preventDefault()}>{currentPost?.data?.title}</Link>
                </div>
                <p className="mb-4 text-muted">
                  <span className="d-inline-block" style={{ transform: "translateY(-2px)" }}>
                    <Clock className="me-2" />
                  </span>
                  {readingTime(currentPost?.data?.content)} min reading in
                  <span className="mx-2">—</span>
                  <span className="d-inline-block" style={{ transform: "translateY(-2px)" }}>
                    <Calender className="me-2" />
                  </span>
                  Published at {formatDate(currentPost?.data?.createdAt)}
                </p>

                <p className="mb-4 pb-1"><MarkdownSyntaxHighlighter content={currentPost?.data?.excerpt} /></p>
              </div>
            </div>

            {currentPost?.data?.featured_image && (
              <div className="col-xl-9 col-lg-10 justify-content-center">
                <BlurImage
                  className="h-auto"
                  src={currentPost?.data?.featured_image}
                  alt={currentPost?.data?.title}
                  width={`650`}
                  height={`400`}
                />
              </div>
            )}

            <div className="col-xl-9 col-lg-10">
              <div className={`section ${currentPost?.data?.featured_image == null ? "pt-0" : ""}`}>
                <div className="content">
                  <MarkdownSyntaxHighlighter content={currentPost?.data?.content} />
                </div>
                <div className="d-block d-sm-flex justify-content-between align-items-center mt-5 pt-3">
                  <SharePost title={currentPost?.data?.title} pageUrl={pageUrl} />
                </div>
              </div>
              <hr style={{ opacity: ".15" }} />
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Scripts for Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdNewsArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdImageObject) }} />

      {useScript("/js/lightense.min.js", "body", true)}
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { req, resolvedUrl } = context;
  const slug = resolvedUrl.substring(resolvedUrl.lastIndexOf("/") + 1);
  const currentPost = await getPostBySlug(slug);
  return {
    props: {
      slug,
      currentPost: currentPost,
    },
  };
};
