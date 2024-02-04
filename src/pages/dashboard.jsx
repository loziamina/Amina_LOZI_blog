import Header from '../web/components/Header'
import PostList from '../web/components/ui/PostList'
import CommentList from '../web/components/ui/CommentList'
import apiClient from '@/web/services/apiClient'
import Loader from '../web/components/ui/Loader'

const DashboardPage = ({ stats, error }) => {
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!stats) {
    return <Loader/>
  }

  return (
    <>
      <Header />
      <main>
        <h1>Dashboard</h1>
        <section>
          <h2>Statistics</h2>
          {stats.postsCount !== undefined && (
            <p>Number of Posts: {stats.postsCount}</p>
          )}
          {stats.commentsCount !== undefined && (
            <p>Number of Comments: {stats.commentsCount}</p>
          )}
        </section>
        <section>
          <h2>Recent Posts</h2>
          <PostList posts={stats.recentPosts} />
        </section>
        <section>
          <h2>Recent Comments</h2>
          <CommentList comments={stats.recentComments} />
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const response = await apiClient.get("/api/dashboard")
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "An error occurred")
    }

    return {
      props: { stats: data },
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)

    return {
      props: { stats: null, error: 'Error fetching data' },
    }
  }
}

export default DashboardPage
