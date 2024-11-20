import React, { useEffect, useState } from "react";
import PostCard from "../components/blog/PostCard";
import axios from "axios";
import { Post } from "../interfaces/Blog";
import TopNavHeader, { NavOption } from "../components/header/TopNavBar";
import Footer from "../components/Footer";
import Logo from "../assets/Logo";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts`,
        );
        console.log(response.data);
        const posts: Post[] = response.data;
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts().then(() => {});
  }, []);

  return (
    <>
      <TopNavHeader selected={NavOption.Blog} />
      <main className="mx-auto w-full max-w-3xl flex-col space-y-16 px-4 lg:px-0 my-20">
        <div className="flex justify-center items-center flex-col gap-10">
          <Logo
            iconOnly={false}
            textOnly={false}
            size={65}
            color="#29AC00"
            text="shop"
          />
          <h2 className="text-green-600">Your Daily Dose of Eco-Inspiration</h2>
        </div>
        {!posts && "You must add at least one Post to your Bucket"}
        {posts &&
          posts.map((post: Post, index: number) => (
            <div key={index}>
              <PostCard post={post} />
            </div>
          ))}
      </main>
      <Footer />
    </>
  );
};

export default Blog;
