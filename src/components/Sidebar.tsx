import { Link } from 'react-router-dom'
import { useBlogs } from '../context/BlogContext'
import { FaFire, FaClock } from 'react-icons/fa'

const Sidebar = () => {
  const { blogs } = useBlogs()

  const categories = ['All', 'Tech', 'Design', 'Tutorial', 'Lifestyle']
  const popularTags = ['React', 'JavaScript', 'TypeScript', 'UI/UX', 'Web Development', 'Design', 'Health', 'Lifestyle', 'Node.js', 'API']

  const recentBlogs = blogs
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)

  const popularBlogs = blogs
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  return (
    <aside className="w-64 space-y-6">
      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${category.toLowerCase()}`}
                className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <FaFire className="mr-2 text-orange-500" />
          Popular Posts
        </h3>
        <ul className="space-y-3">
          {popularBlogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blog/${blog.id}`}
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <FaClock className="mr-2 text-blue-500" />
          Recent Posts
        </h3>
        <ul className="space-y-3">
          {recentBlogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blog/${blog.id}`}
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <Link
              key={index}
              to={`/tag/${tag.toLowerCase()}`}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

