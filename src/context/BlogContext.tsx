import React, { createContext, useContext, useState, useEffect } from 'react'
import { Blog } from '../types'
import { toast } from 'react-hot-toast'

interface BlogContextType {
  blogs: Blog[]
  loading: boolean
  addBlog: (blog: Omit<Blog, 'id' | 'publishedAt' | 'likes' | 'views'>) => void
  updateBlog: (id: string, updates: Partial<Blog>) => void
  deleteBlog: (id: string) => void
  likeBlog: (id: string) => void
  incrementViews: (id: string) => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export const useBlogs = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlogs must be used within a BlogProvider')
  }
  return context
}

// Sample initial blogs
const initialBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: `# Getting Started with React Hooks

React Hooks revolutionized the way we write React components. They allow us to use state and other React features in functional components.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8.

## Common Hooks

### useState
The useState hook allows you to add state to functional components.

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### useEffect
The useEffect hook lets you perform side effects in functional components.

\`\`\`javascript
useEffect(() => {
  // Side effect code
}, [dependencies]);
\`\`\`

## Benefits

- Cleaner code
- Better reusability
- Easier testing
- No more class components needed

Start using hooks today and see the difference!`,
    excerpt: 'Learn how to use React Hooks to write cleaner and more maintainable React code.',
    author: 'John Doe',
    authorEmail: 'john@example.com',
    category: 'Tech',
    tags: ['React', 'JavaScript', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    publishedAt: new Date().toISOString(),
    likes: 42,
    views: 1200,
    featured: true,
  },
  {
    id: '2',
    title: 'The Art of UI/UX Design',
    content: `# The Art of UI/UX Design

User Interface (UI) and User Experience (UX) design are crucial aspects of modern web development.

## Understanding UI vs UX

**UI Design** focuses on the visual elements users interact with.
**UX Design** focuses on the overall experience and usability.

## Key Principles

1. **Simplicity** - Keep designs clean and uncluttered
2. **Consistency** - Maintain design patterns throughout
3. **Accessibility** - Design for all users
4. **Feedback** - Provide clear user feedback

## Tools and Resources

- Figma for design
- Adobe XD for prototyping
- User testing for validation

Great design is invisible - users notice it when it's missing!`,
    excerpt: 'Explore the fundamentals of creating beautiful and user-friendly interfaces.',
    author: 'Jane Smith',
    authorEmail: 'jane@example.com',
    category: 'Design',
    tags: ['UI/UX', 'Design', 'Web Design'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 38,
    views: 980,
    featured: true,
  },
  {
    id: '3',
    title: 'Mastering TypeScript in 2024',
    content: `# Mastering TypeScript in 2024

TypeScript has become the standard for large-scale JavaScript applications.

## Why TypeScript?

- Type safety
- Better IDE support
- Easier refactoring
- Self-documenting code

## Getting Started

Install TypeScript:
\`\`\`bash
npm install -g typescript
\`\`\`

Create a tsconfig.json file and start coding with types!

## Advanced Features

- Generics
- Decorators
- Advanced types
- Module system

TypeScript makes JavaScript development more robust and maintainable.`,
    excerpt: 'A comprehensive guide to TypeScript and its advanced features.',
    author: 'Mike Johnson',
    authorEmail: 'mike@example.com',
    category: 'Tech',
    tags: ['TypeScript', 'Programming', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 55,
    views: 1500,
  },
  {
    id: '4',
    title: 'Healthy Lifestyle Tips',
    content: `# Healthy Lifestyle Tips

Maintaining a healthy lifestyle is essential for overall well-being.

## Key Areas

### Nutrition
- Eat balanced meals
- Stay hydrated
- Limit processed foods

### Exercise
- Regular physical activity
- Find activities you enjoy
- Stay consistent

### Mental Health
- Practice mindfulness
- Get enough sleep
- Manage stress

Remember, small changes lead to big results!`,
    excerpt: 'Simple tips to improve your daily lifestyle and well-being.',
    author: 'Sarah Williams',
    authorEmail: 'sarah@example.com',
    category: 'Lifestyle',
    tags: ['Health', 'Wellness', 'Lifestyle'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    likes: 28,
    views: 750,
  },
  {
    id: '5',
    title: 'Building RESTful APIs with Node.js',
    content: `# Building RESTful APIs with Node.js

Learn how to create robust REST APIs using Node.js and Express.

## Setting Up

\`\`\`bash
npm init -y
npm install express
\`\`\`

## Best Practices

- Use proper HTTP methods
- Implement error handling
- Add authentication
- Document your API

## Testing

Always test your APIs thoroughly before deployment.`,
    excerpt: 'A step-by-step guide to creating RESTful APIs with Node.js.',
    author: 'John Doe',
    authorEmail: 'john@example.com',
    category: 'Tutorial',
    tags: ['Node.js', 'API', 'Backend'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    likes: 33,
    views: 1100,
  },
]

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const saved = localStorage.getItem('blogify-blogs')
    return saved ? JSON.parse(saved) : initialBlogs
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('blogify-blogs', JSON.stringify(blogs))
  }, [blogs])

  const addBlog = (blogData: Omit<Blog, 'id' | 'publishedAt' | 'likes' | 'views'>) => {
    const newBlog: Blog = {
      ...blogData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      likes: 0,
      views: 0,
    }
    setBlogs((prev) => [newBlog, ...prev])
    toast.success('Blog post created successfully!')
  }

  const updateBlog = (id: string, updates: Partial<Blog>) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, ...updates, updatedAt: new Date().toISOString() }
          : blog
      )
    )
    toast.success('Blog post updated successfully!')
  }

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id))
    toast.success('Blog post deleted successfully!')
  }

  const likeBlog = (id: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    )
  }

  const incrementViews = (id: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, views: blog.views + 1 } : blog
      )
    )
  }

  const value: BlogContextType = {
    blogs,
    loading,
    addBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    incrementViews,
  }

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

