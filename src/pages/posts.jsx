import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/posts", { params: { page } })

  return {
    props: { initialData: data },
  }
}

const PostsPage = ({ initialData }) => {
  const { query } = useRouter()
  const page = Number.parseInt(query.page || 1, 10)
  const {
    isFetching,
    data: {
      result: posts,
      meta: { count },
    },
    refetch,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
    enabled: false,
  })

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (postId) => apiClient.delete(`/posts/${postId}`),
  })

  const handleClickDelete = async (event) => {
    const postId = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deletePost(postId)
    await refetch()
  }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <table className="w-full">
        <thead>
          <tr>
            {["#", "Name", "🗑️"].map((label) => (
              <td
                key={label}
                className="p-4 bg-slate-300 text-center font-semibold"
              >
                {label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map(({ id, description }) => (
            <tr key={id} className="even:bg-slate-100">
              <td className="p-4">{id}</td>
              <td className="p-4">{description}</td>
              <td className="p-4">
                <button data-id={id} onClick={handleClickDelete}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} page={page} className="mt-8" />
    </div>
  )
}

export default PostsPage
