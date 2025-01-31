import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Post from "@/components/Post";

const CategoryPage = ({ category, posts }) => {
    return (
        <Layout
        metaTitle={`Showing posts from - ${
          category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
        }`}
      >
        <PageHeader title={category} taxonomy={true} />
  
        <section className="section pt-0">
          <div className="container">
            <div className="row gy-5 gx-md-5">
               {posts.map((post, i) => (
                <div key={i} className="col-lg-3 col-md-6">
                  <Post post={post} />
                </div>
              ))} 
            </div>
          </div>
        </section>
      </Layout>
    );
  };
  
  // Server-Side Rendering
  export async function getServerSideProps(context) {
    const { category } = context.params;
    // Fetch posts for the given category
    const posts = await fetchPostsByCategory(category);
    if (!posts) {
      return {
        notFound: true, // Return 404 if category not found
      };
    }
  
    return {
      props: {
        category,
        posts:posts.data,
      },
    };
  }
  
  async function fetchPostsByCategory(category) {
    // Replace with your actual API endpoint
    const response = await fetch(`${process.env.API_BASE_URL}api/posts/category/${category}?limit=100`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  export default CategoryPage;
  