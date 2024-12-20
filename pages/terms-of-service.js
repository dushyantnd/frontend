import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getSinglePage } from "@/libs/getSinglePage";

const TermsOfService = ({ terms }) => {
  const { title, description } = terms.frontMatter;

  return (
    <Layout metaTitle={title} description={description}>
      <PageHeader title={title} />

      <section className="section pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="content">
                <Markdown content={terms.content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;

// Export Props
export const getStaticProps = () => {
  return {
    props: {
      terms: getSinglePage("content/terms-of-service.md"),
    },
  };
};
