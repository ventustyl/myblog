import React from "react";
import { getPost } from "@/app/lib/serverMethods/blog/postMethods";

export default async function page({ params }) {
  const { slug } = await params;
  console.log(slug);
  
  const post = await getPost(slug);

  return (
    <div className="u-main-container u-padding-content-container ">
      <h1 className="t-main-title">➕ {post.title}</h1>
      <p>{post.article}</p>
    </div>
  );
}
