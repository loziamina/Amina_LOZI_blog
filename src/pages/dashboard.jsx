import Header from '../web/components/Header'
import apiClient from '@/web/services/apiClient'
import Loader from '../web/components/ui/Loader'

const DashboardPage = ({ stats, error }) => {
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!stats) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <main className="bg-gray-100 p-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <section className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.postsCount !== undefined && (
              <div className="bg-blue-500 text-white rounded-lg p-4">
                <p className="text-lg font-semibold">Number of Posts</p>
                <p className="text-2xl">{stats.postsCount}</p>
              </div>
            )}
            {stats.commentsCount !== undefined && (
              <div className="bg-green-500 text-white rounded-lg p-4">
                <p className="text-lg font-semibold">Number of Comments</p>
                <p className="text-2xl">{stats.commentsCount}</p>
              </div>
            )}
          </div>
        </section>
        <section className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-blue-500 text-white">ID</th>
                <th className="py-2 px-4 bg-blue-500 text-white">Title</th>
                <th className="py-2 px-4 bg-blue-500 text-white">Author</th>
                <th className="py-2 px-4 bg-blue-500 text-white">Comments</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentPosts.map((post) => (
                <tr key={post.id}>
                  <td className="py-2 px-4">{post.id}</td>
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.author.name}</td>
                  <td className="py-2 px-4">
                    <ul>
                      {post.comments.map((comment) => (
                        <li key={comment.id}>{comment.text}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const response = await apiClient.get("/dashboard");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return {
      props: { stats: data },
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    return {
      props: { stats: null, error: 'Error fetching data' },
    }
  }
}

export default DashboardPage
