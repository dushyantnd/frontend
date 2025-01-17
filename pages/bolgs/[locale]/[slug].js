
export default function BlogPost({ post }) {
    // Render the blog content

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>
          <strong>Language:</strong> {post.language === "hi" ? "Hindi" : "English"}
        </p>
      </div>
    );
  }
  
  // Server-side rendering for dynamic routes
  export async function getServerSideProps({ params }) {
    const { locale, slug } = params;
  
    // Example localized blog data
    const blogData = {
      en: {
        "blog-slug": { title: "Blog Title in English", content: "This is English content.", language: "en" },
        "another-blog": { title: "Another Blog in English", content: "More English content.", language: "en" },
      },
      hi: {
        "blog-slug": { title: "ब्लॉग का शीर्षक हिंदी में", content: "यह हिंदी सामग्री है।", language: "hi" },
        "another-blog": { title: "एक और हिंदी ब्लॉग", content: "अधिक हिंदी सामग्री।", language: "hi" },
      },
    };
  
    const post = blogData[locale]?.[slug];
  
    // Handle 404 if the post is not found
    if (!post) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        post, // Pass the localized post content as props
      },
    };
  }
  