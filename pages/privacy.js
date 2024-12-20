import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getSinglePage } from "@/libs/getSinglePage";

const Privacy = ({ privacy }) => {
  const { title, image, description } = privacy.frontMatter;

  return (
    <Layout metaTitle={title} description={description} ogImage={image}>
      <PageHeader title={title} />

      <section className="section pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="content">
                <Markdown content={privacy.content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;

// Export Props
export const getStaticProps = () => {
  return {
    props: {
      privacy: getSinglePage("content/privacy.md"),
    },
  };
};
