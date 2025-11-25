import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBlogs } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'
import ReactMarkdown from 'react-markdown'
import { FaCalendar, FaUser, FaHeart, FaEye, FaEdit, FaTrash, FaArrowLeft, FaShareAlt } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { blogs, likeBlog, incrementViews, deleteBlog } = useBlogs()
  const { user, isAdmin } = useAuth()
  const [liked, setLiked] = useState(false)

  const blog = blogs.find((b) => b.id === id)

  useEffect(() => {
    if (blog && id) {
      incrementViews(id)
    }
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Blog not found</p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleLike = () => {
    if (!liked) {
      likeBlog(blog.id)
      setLiked(true)
      toast.success('Liked!')
    } else {
      toast.error('You already liked this post')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog(blog.id)
      toast.success('Blog post deleted')
      navigate('/')
    }
  }

  const isOwner = user && (user.email === blog.authorEmail || isAdmin)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blogs
        </Link>

        {isOwner && (
          <div className="flex justify-end gap-4 mb-6">
            <Link
              to={`/admin/edit/${blog.id}`}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEdit />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>
        )}

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {blog.image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="flex items-center">
                <FaCalendar className="mr-2" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center">
                <FaUser className="mr-2" />
                {blog.author}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                  {blog.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      liked
                        ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900'
                    }`}
                  >
                    <FaHeart />
                    <span>{blog.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <FaEye />
                    <span>{blog.views} views</span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaShareAlt />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogDetail

