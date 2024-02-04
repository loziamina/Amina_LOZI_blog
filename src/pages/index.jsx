import { formatDateTimeShort } from "@/utils/formatters"
import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import apiClient from "@/web/services/apiClient"
import Link from "@/web/components/ui/Link"

const IndexPage = ({ initialData }) => {
  const { query } = useRouter()
  const page = parseInt(query.page, 10) || 1
  const { data, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient.get("/posts", { params: { page } }).then(res => res.data),
    initialData,
    keepPreviousData: true
  })

  const posts = data?.posts || []
  const count = data?.meta?.count || 0

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {isFetching && <Loader />}
      <div className="bg-white p-4 shadow">
        <h1 className="text-3xl font-semibold text-center p-4">Latest Posts</h1>
        <div>
          {posts.map(({ id, title, content, createdAt, author }) => (
            <article key={id} className="mb-4 p-4 bg-white shadow">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-gray-600">{content.substring(0, 200)}...</p>
              <div className="text-sm text-gray-500">
                By {author.email} on {formatDateTimeShort(new Date(createdAt))}
              </div>
              <Link href={`/posts/${id}`}>
                <a className="text-blue-500 hover:underline">Read more</a>
              </Link>
            </article>
          ))}
        </div>
        <Pagination count={count} page={page} />
      </div>
    </div>
  )
}

export default IndexPage
