import Header from "../components/header.js";
import Footer from "../components/footer.js";
import projects from "../utils/projects.json";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export default function About({ source }) {
  return (
    <>
      <Header />
      <div className="container">
        <section className="readme">
          <MDXRemote {...source} />
        </section>
        <div className="portfolio">
          <h2>My Projects</h2>
          <div className="project-list">
            {projects.map((project, i) => (
              <div className="project" key={i}>
                {project.image !== "" &&
                  <img className="project-image" src={project.image} />
                }
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.repo} target='_blank'>Repository</a>
                  <a href={project.demo} target='_blank'>Demo</a>
                </div>
                <div className="tags">[
                  {project.tags.map((tag, i) => {
                    if (i === project.tags.length - 1) {
                      return <p>{`${tag}`}</p>
                    } else {
                      return <p>{`${tag},`}</p>
                    }
                  })}
                  ]</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const aboutPath = path.join(process.cwd(), "markdown/about.md");
  const fileContents = fs.readFileSync(aboutPath, "utf8");

  const { data, content: markdown } = matter(fileContents);
  const mdxSource = await serialize(markdown);

  return {
    props: {
      source: mdxSource,
    },
  };
}
