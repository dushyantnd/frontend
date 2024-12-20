import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import MarkdownSyntaxHighlighter from "@/components/ReactMarkdownSyntaxHighlighter";
import { getSinglePage } from "@/libs/getSinglePage";
import { useScript } from "@/libs/useScript";

const Elements = ({ elements: { frontMatter, content } }) => {
  const { title, description } = frontMatter;

  return (
    <Layout metaTitle={title} description={description}>
      <PageHeader title={title} />

      <section className="section pt-0 bg-body">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content">
                <MarkdownSyntaxHighlighter content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {useScript("/js/lightense.min.js", "body", true)}
    </Layout>
  );
};

export default Elements;

export const getStaticProps = () => {
  return {
    props: {
      elements: getSinglePage("content/elements.md"),
    },
  };
};
