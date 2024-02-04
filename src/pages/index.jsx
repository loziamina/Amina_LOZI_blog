import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/web/services/apiClient'
import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import { useRouter } from "next/router"
import Link from "next/link"

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const { data } = await apiClient.get("/api/posts", { params: { page } })
  return {
    props: { initialData: data }
  }
}

const IndexPage = ({ initialData }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()
  const page = parseInt(query.page, 10) || 1
  const { data, isFetching } = useQuery(["posts", page], () => apiClient.get(`/api/posts?page=${page}`).then(res => res.data), {
    initialData,
    keepPreviousData: true
  })

  const createPostMutation = useMutation(newPost => apiClient.post('/api/posts', newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createPostMutation.mutateAsync({ title, content })
    setTitle('')
    setContent('')
  }

  const posts = data?.posts || []
  const count = data?.meta?.count || 0

  return (
    <div className="relative">
      <h1>Latest Posts</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {isFetching ? <Loader /> : posts.map(({ id, title, content, createdAt, author }) => (
        <article key={id}>
          <h2>{title}</h2>
          <p>{content.substring(0, 200)}</p>
          <div>By {author.email} on {new Date(createdAt).toLocaleString()}</div>
          <Link href={`/posts/${id}`}><a>Read more</a></Link>
        </article>
      ))}
      <Pagination count={count} page={page} />
    </div>
  )
}

export default IndexPage
