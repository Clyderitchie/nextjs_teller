// import PostEditor from "@/components/posts/editor/PostEditor";
// import Post from "@/components/posts/Post";
// import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
// import { postDataInclude } from "@/lib/types";

export default async function Home() {
  // const posts = await prisma.post.findMany({
  //   include: postDataInclude,
  //   orderBy: { createdAt: "desc" },
  // });
  return (
    // Main class below is responsible for setting background color for the Post screen section
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
       Home Page
      </div>
      {/* <TrendsSidebar /> */}
    </main>
  );
}
