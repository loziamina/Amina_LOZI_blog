const CommentList = ({ comments }) => {
  return (
    <div className="p-4 space-y-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold">Comments</h3>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full"></div>
            <div className="ml-2">
              <p className="text-sm font-medium">{comment.author}</p>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentList
