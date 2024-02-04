const PostList = ({ posts }) => {
  return (
    <div className="p-4 space-y-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold">Posts</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <h4 className="text-xl font-semibold">{post.title}</h4>
            <p className="text-gray-600">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
