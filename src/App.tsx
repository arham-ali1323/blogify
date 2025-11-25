import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'
import Login from './pages/Login'
import Admin from './pages/Admin'
import EditBlog from './pages/EditBlog'
import { useBlogs } from './context/BlogContext'
import { useMemo } from 'react'

function App() {
  const { blogs } = useBlogs()

  const CategoryPage = () => {
    const category = window.location.pathname.split('/')[2]
    const filteredBlogs = useMemo(() => {
      if (category === 'all') return blogs
      return blogs.filter((blog) => blog.category.toLowerCase() === category)
    }, [blogs, category])

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 capitalize">
            {category} Posts
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex gap-8">
                <div className="hidden lg:block">
                  <Sidebar />
                </div>
                <div className="flex-1">
                  <Home />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit/:id" element={<EditBlog />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/tag/:tag" element={<CategoryPage />} />
      </Routes>
    </div>
  )
}

export default App

