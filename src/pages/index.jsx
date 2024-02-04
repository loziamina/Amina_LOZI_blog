import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Link from "@/web/components/ui/Link"


export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/posts", { params: { page } })
  return {
    props: { initialData: data },
  }
}

const IndexPage = ({ initialData }) => {
  const { query } = useRouter();
  const page = Number.parseInt(query.page || 1, 10)
   const {
    data: {
      result: posts,
      meta: { count },
    },

  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
    enabled: false,
  })

  

  if (isLoading) return <Loader />
  if (error) return <p>Error loading posts.</p>


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      {posts.map((post) => (
        <article key={post.id} className="mb-4 p-4 bg-white shadow rounded-lg">
          <p>{post.description}</p> 
          <div className="text-sm text-gray-500">By {post.author?.email} on {formatDateTimeShort(new Date())}</div>
          <div className="mt-4">
            <Link href={`/posts/${post.id}`}>
              <a className="text-blue-600 hover:underline">Read more</a>
            </Link>
          </div>
        </article>
      ))}
      <Pagination count={count} page={page} />
    </div>
  )
}

export default IndexPage