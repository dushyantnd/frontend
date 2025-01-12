import BlurImage from "@/components/BlurImage";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import MarkdownSyntaxHighlighter from "@/components/ReactMarkdownSyntaxHighlighter";
import SharePost from "@/components/SharePost";
import siteConfig from "@/config/site.config.json";
//import { getAuthors } from "@/libs/getAuthors";
import { getPosts, getPostBySlug } from "@/libs/getPosts";
import { getRelatedPosts } from "@/libs/getRelatedPosts";
import { useScript } from "@/libs/useScript";
import { ArrowUpRight, Calender, Clock } from "@/utils/Icons";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function PostPage({
  slug,
  currentPost
}) {
  const router = useRouter();
  const { category } = router.query;
  const pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;
  return (
    <Layout metaTitle={currentPost?.data?.meta_title} metaDescription={currentPost?.data?.meta_desc} ogImage={currentPost?.data?.featured_image}>
      <section className="bg-body">
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-xl-9 col-lg-10">
              <div className="section">
                <div className="post-author d-flex flex-wrap align-items-center">
                  <Link
                    className="text-link"
                    href={`/`}
                  >
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <Link
                    className="text-link"
                    href={`/${slugify(category)}`}
                  >
                    {category}
                  </Link>
                  <span className="mx-2">/</span>
                  <Link
                    className="text-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    {currentPost?.data?.title}
                  </Link>
                </div>
                <p className="mb-4 text-muted">
                  <span
                    className="d-inline-block"
                    style={{ transform: "translateY(-2px)" }}
                  >
                    <Clock className="me-2" />
                  </span>
                  {readingTime(currentPost?.data?.content)} min reading in
                  <span className="mx-2">—</span>
                  <span
                    className="d-inline-block"
                    style={{ transform: "translateY(-2px)" }}
                  >
                    <Calender className="me-2" />
                  </span>
                  Published at {formatDate(currentPost?.data?.createdAt)}



                </p>

                {/* <h1 className="h2 mb-3">{currentPost?.data?.title}</h1> */}
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
                  {/* <ul className="taxonomy-lists list-inline">
                    <li className="list-inline-item d-block mb-3">Tags: </li>
                    {tags.map((tag, i) => (
                      <li key={i} className="list-inline-item">
                        <Link
                          href={`/tags/${slugify(tag)}`}
                          className="bg-white"
                        >
                          <span className="small me-1">#</span>
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul> */}

                  <SharePost title={currentPost?.data?.title} pageUrl={pageUrl} />
                </div>
              </div>

              <hr style={{ opacity: ".15" }} />
            </div>
          </div>

          {/* <div className="section">
            <div className="row align-items-center section-title">
              <div className="col-sm-7">
                <h2 className="h3 mb-0 title">Keep Reading</h2>
              </div>
              <div className="col-sm-5 text-end d-none d-sm-block">
                <Link href="/blog/" className="text-link lead active">
                  All Posts
                  <ArrowUpRight />
                </Link>
              </div>
            </div>

            <div className="row gy-5 g-md-5">
              {relatedPosts.map((post, key) => (
                <div key={key} className="col-lg-4 col-md-6">
                  <Post
                    post={post}
                    authors={allAuthors}
                    compact={true}
                    status="Related"
                  />
                </div>
              ))}
              {/* {recentPosts.map((post, key) => (
                <div key={key} className="col-lg-4 col-md-6">
                  <Post
                    post={post}
                    authors={allAuthors}
                    compact={true}
                    status="New"
                  />
                </div>
              ))} *
            </div>

            <div className="d-block d-sm-none mt-5 pt-3">
              <div className="text-center">
                <Link href="/blog/" className="text-link lead active">
                  All Posts
                  <ArrowUpRight />
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </section>

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
