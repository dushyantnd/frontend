// import { sortByDate } from "@/utils/sortByDate";
// import fs from "fs";
// import matter from "gray-matter";
// import path from "path";

// const blogDirectory = "content/blog";
// const blogDirFiles = fs.readdirSync(path.join(blogDirectory));
// const blogs = blogDirFiles.filter((f) => f.includes(".md"));

// export const getPosts = () => {
//   const returnDirFiles = blogs.map((filename) => {
//     const slug = filename.replace(".md", "");
//     const dirFileContents = fs.readFileSync(
//       path.join(blogDirectory, filename),
//       "utf8"
//     );

//     const { data: frontMatter, content } = matter(dirFileContents);

//     return {
//       slug,
//       frontMatter,
//       content,
//     };
//   });
//   return returnDirFiles.sort(sortByDate);
// };

import axios from "axios";
import { sortByDate } from "@/utils/sortByDate";

export const getPosts = async () => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${process.env.API_BASE_URL}api/posts/`);
    
    // Ensure the data is sorted before returning
   // const posts = response.data.sort(sortByDate);
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
};

export const getPostBySlug = async (slug) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${process.env.API_BASE_URL}api/posts/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
};


