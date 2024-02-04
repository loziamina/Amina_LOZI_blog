import { formatDateTimeShort } from "@/utils/formatters"
import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import apiClient from "@/web/services/apiClient"
import Link from "next/link"

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  try {
    const { data } = await apiClient.get("/api/posts", { params: { page } })
    return {
      props: { initialData: data },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: { initialData: { posts: [], meta: { count: 0 } } },
    }
  }
}

const IndexPage = ({ initialData }) => {
  const { query } = useRouter();
  const page = parseInt(query.page, 10) || 1;
  const { data, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient.get("/api/posts", { params: { page } }).then(res => res.data),
    initialData,
    keepPreviousData: true,
  })

  const posts = data?.posts || []
  const count = data?.meta?.count || 0

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <h1>Latest Posts</h1>
      <div>
        {posts.map(({ id, title, content, createdAt, author }) => (
          <article key={id} className="mb-4 p-4 bg-white shadow">
            <h2 className="text-xl font-bold">{title}</h2>
            <p>{content.substring(0, 200)}...</p>
            <div className="text-sm">By {author.name} on {formatDateTimeShort(new Date(createdAt))}</div>
            <Link href={`/posts/${id}`}>
              <a className="text-blue-500 hover:underline">Read more</a>
            </Link>
          </article>
        ))}
      </div>
      <Pagination count={count} page={page} />
    </div>
  )
}

export default IndexPage
