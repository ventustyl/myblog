import { connectDB } from "@/lib/utils/db/connect";
import Link from "next/link";


const posts = [
  {
    auteur: "Eric Venturino",
    titre: "CSS Flex",
  },
  {
    auteur: "Eric Venturino",
    titre: "CSS Grid",
  },
  {
    auteur: "Eric Venturino",
    titre: "CSS Float",
  },
];

export default async function Home() {






  await connectDB()
  
  return (
    <div className="u-padding-content-container u-main-container">
      <h1 className="t-main-title">📚 My blog</h1>
      <p className="t-main-subtitle">Dédié au code web</p>
      <p className="mr-4 text-md text-black">Derniers articles</p>
      <ul className="u-articles-grid">
        {posts.map((post, index) => (
          <li
            key={index}
            className="rounded-sm shadow-md hover:border-shadow-sm hover:scale-105 transition-all"
          >
            <div className="pt-5 px-5 pb-7">
              <div className="flex items-baseline justify-between text-xs mb-4 ">
                <time dateime={new Date().toISOString()}>
                  {new Date().toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <Link className="whitespace-nowrap truncate hover:text-gray-600" href={`/categories/author/${post.auteur}`}>{post.auteur}</Link>
              </div>
              <Link className="inline-block mt-6" href={`article/${post.titre}`}><h2>{post.titre}</h2></Link>
         
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
