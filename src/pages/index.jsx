import { formatDateTimeShort } from "@/utils/formatters";
import Loader from "@/web/components/ui/Loader";
import Pagination from "@/web/components/ui/Pagination";
import apiClient from "@/web/services/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/api/posts", { params: { page } })

  return {
    props: { initialData: data },
  }
}

const IndexPage = ({ initialData }) => {
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
    queryFn: () => apiClient("/api/posts", { params: { page } }),
    initialData,
    enabled: false,
  })
  const { mutateAsync: toggleComment } = useMutation({
    mutationFn: (comment) =>
      apiClient.patch(`/api/comments/${comment.id}`, {
        isDone: !comment.isDone,
      }),
  })
  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: (commentId) => apiClient.delete(`api//comments/${commentId}`),
  })

  const handleClickToggle = (comment) => async () => {
    await toggleComment(comment);
    await refetch();
  }

  const handleClickDelete = async (commentId) => {
    await deleteComment(commentId);
    await refetch();
  }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <table className="w-full">
        <thead>
          <tr>
            {[
              "#",
              "Description",
              "Done",
              "Post",
              "Created At",
              "",
              "🗑️",
            ].map((label) => (
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
          {posts.map(({ id, description, isDone, createdAt, post }) => (
            <tr key={id} className="even:bg-slate-100">
              <td className="p-4">{id}</td>
              <td className="p-4">{description}</td>
              <td className="p-4">{isDone ? "✅" : "❌"}</td>
              <td className="p-4">{post.title}</td>
              <td className="p-4">
                {formatDateTimeShort(new Date(createdAt))}
              </td>
              <td className="p-4">
                <button onClick={handleClickToggle({ id, isDone })}>Toggle</button>
              </td>
              <td className="p-4">
                <button data-id={id} onClick={() => handleClickDelete(id)}>
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

export default IndexPage
