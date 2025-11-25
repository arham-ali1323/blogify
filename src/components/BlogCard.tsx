import { Link } from 'react-router-dom'
import { Blog } from '../types'
import { FaCalendar, FaUser, FaHeart, FaEye } from 'react-icons/fa'

interface BlogCardProps {
  blog: Blog
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {blog.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {blog.featured && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center">
            <FaCalendar className="mr-1" />
            {formatDate(blog.publishedAt)}
          </span>
          <span className="flex items-center">
            <FaUser className="mr-1" />
            {blog.author}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {blog.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <FaHeart className="mr-1 text-red-500" />
              {blog.likes}
            </span>
            <span className="flex items-center">
              <FaEye className="mr-1" />
              {blog.views}
            </span>
          </div>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
            {blog.category}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default BlogCard

