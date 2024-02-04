import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const PostsPage = ({ initialData }) => {
  const { query } = useRouter();
  const page = Number.parseInt(query.page || 1, 10);
  const {
    isFetching,
    data: {
      result: posts = [], 
      meta: { count } = {}, 
    } = {},
    refetch,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
    enabled: true,
  })
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (postId) => apiClient.delete(`/posts/${postId}`),
  })

  const handleClickDelete = async (postId) => {
    try {
      await deletePost(postId)
      await refetch()
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <table className="w-full">
        <thead>
          <tr>
            {["#", "Author ID", "Title", "Content", "Published", "Created At", "Updated At", "🗑️"].map((label) => (
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
          {posts.map(({ id, authorId, title, content, published, createdAt, updatedAt }) => (
            <tr key={id} className="even:bg-slate-100">
              <td className="p-4">{id}</td>
              <td className="p-4">{authorId}</td>
              <td className="p-4">{title}</td>
              <td className="p-4">{content}</td>
              <td className="p-4">{published ? "Yes" : "No"}</td>
              <td className="p-4">{new Date(createdAt).toLocaleString()}</td>
              <td className="p-4">{new Date(updatedAt).toLocaleString()}</td>
              <td className="p-4">
                <button onClick={() => handleClickDelete(id)}>Delete</button>
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
