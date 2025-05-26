import Link from "next/link";
import React from "react";
import { connectToDB } from "./lib/utils/db/connectToDB";
import { getPosts } from "./lib/serverMethods/blog/postMethods";
// const posts = [
//   {
//     author: "Eric Venturino",
//     title: "CSS Grid",
//   },
//   {
//     author: "Eric Venturino",
//     title: "CSS Flex",
//   },
//   {
//     author: "Eric Venturino",
//     title: "CSS Float",
//   },
// ];

export default async function page() {

  await connectToDB()

  const posts = await getPosts()


  return (
    <div className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">📚 My blog</h1>
      <p className="t-main-subtitle">Les tips du developpeur web</p>
      <p className="my-8">
        <span className="box-decoration-clone bg-linear-to-r from-indigo-600 to-blue-500 px-2 text-white text-3xl p-1 ml-4  font-bold">
          Derniers
          <br />
          Articles
        </span>
      </p>
      <ul className="u-article-grid">
        {posts.map((post, index) => (
          <li
            className="rounded-sm shadow-md hover:shadow-xl border border-transparent hover:border hover:border-blue-50 p-2 "
            key={index}
          >
            <div className="p-2">
              <div className="flex items-baseline gap-x-4 text-xs">
                <time dateTime={new Date().toISOString()}>
                  {new Date().toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <Link href={`/categories/author/${post.author}`} className="ml-auto hover:text-blue-300 whitespace-nowrap truncate">{post.author}</Link>
              </div>
              <Link href={`/article/${post.title}`} className="inline-block mt-6 text-xl hover:text-blue-300 ">{post.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
