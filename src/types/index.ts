export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  authorEmail: string
  category: string
  tags: string[]
  image?: string
  publishedAt: string
  updatedAt?: string
  likes: number
  views: number
  featured?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  isAdmin?: boolean
}

