import { useState, useMemo } from 'react'
import { useBlogs } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import { FaSearch } from 'react-icons/fa'

const Home = () => {
  const { blogs } = useBlogs()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'Tech', 'Design', 'Tutorial', 'Lifestyle']

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === 'All' || blog.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [blogs, searchQuery, selectedCategory])

  const featuredBlogs = blogs.filter((blog) => blog.featured)
  const regularBlogs = filteredBlogs.filter((blog) => !blog.featured)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {featuredBlogs.length > 0 && searchQuery === '' && selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* All Blogs */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Posts'}
            {filteredBlogs.length > 0 && (
              <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({filteredBlogs.length})
              </span>
            )}
          </h2>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No blogs found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

