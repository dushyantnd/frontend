import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BlurImage from "@/components/BlurImage";
import Layout from "@/components/Layout";
import MarkdownSyntaxHighlighter from "@/components/ReactMarkdownSyntaxHighlighter";
import SharePost from "@/components/SharePost";
import siteConfig from "@/config/site.config.json";
import { useScript } from "@/libs/useScript";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight, Calender, Clock } from "@/utils/Icons";
import Post from "@/components/Post";

export default function PostPage({
  currentPost,
  initialRelatedPosts,
  pagination,
}) {
  const router = useRouter();
  const { category } = router.query;
  const pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blogs`;
    console.log("pagination.page",pagination.page)
  const [relatedPosts, setRelatedPosts] = useState(initialRelatedPosts);
  const [currentPage, setCurrentPage] = useState(pagination.page);
  const [totalPages, setTotalPages] = useState(pagination.totalPages);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.disconnect();
    };
  }, [loading, currentPage, totalPages]);

  useEffect(() => {
    console.log("currentPage - ",currentPage)
    if (currentPage === pagination.page) return;

    const fetchMorePosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.API_BASE_URL}api/posts?page=${currentPage}&limit=4`,
        );
        setRelatedPosts((prev) => [...prev, ...response.data.data]);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching more posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMorePosts();
  }, [currentPage]);

  return (
    <Layout
      metaTitle={currentPost?.data?.meta_title}
      metaDescription={currentPost?.data?.meta_desc}
      ogImage={currentPost?.data?.featured_image}
      ogUrl={`${siteConfig.baseURL}/blog/${currentPost?.data?.slug}`}
    >
      <section className="bg-body">
        <div className="container">
          <div className="row justify-content-center">
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
              <div
                className={`section ${
                  currentPost?.data?.featured_image == null ? "pt-0" : ""
                }`}
              >
                <div className="content">
                  <MarkdownSyntaxHighlighter
                    content={currentPost?.data?.content}
                  />
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

      <section className="related-posts bg-body">
        <div className="container">
          <div className="row">
            {relatedPosts.map((post) => (
              <div key={post.slug} className="col-lg-4 col-md-6 mb-4">
                <Post post={post} />
              </div>
            ))}
          </div>
          <div ref={observerRef} style={{ height: 1, visibility: "hidden" }} />
          {loading && <p className="text-center">Loading...</p>}
        </div>
      </section>

      {useScript("/js/lightense.min.js", "body", true)}
    </Layout>
  );
}


export const getServerSideProps = async (context) => {
    const { resolvedUrl, query } = context;
    const page = query.page || 1; // Default to page 1
    const limit = 4; // Number of posts per page
    console.log("page - ",page)
    try {
      // Fetch the current post data
      const currentPostResponse = await axios.get(
        `${process.env.API_BASE_URL}api/posts?limit=${limit}&page=${page}`
      );
      
      // Extract the data and ensure it's serializable
      const currentPost = currentPostResponse.data.data || null;
  
      // Ensure pagination data has defaults
      const pagination = currentPostResponse.data.pagination || {
        page: 1,
        totalPages: 1,
      };
      console.log(pagination)
      return {
        props: {
          currentPost,
          initialRelatedPosts: currentPostResponse.data.data || [],
          pagination,
        },
      };
    } catch (error) {
      console.error("Error fetching posts:", error.message);
  
      // Handle errors gracefully by providing default fallback values
      return {
        props: {
          currentPost: null,
          initialRelatedPosts: [],
          pagination: { page: 1, totalPages: 1 },
        },
      };
    }
  };
  