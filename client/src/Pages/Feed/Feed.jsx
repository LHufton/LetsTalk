import React, { useEffect, useState } from 'react'
import { GetPosts } from '../../Services/PostServices'
import { useNavigate } from 'react-router-dom'

const Feed = ({ user }) => {
  let navigate = useNavigate()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPosts()
      setPosts(data)
    }
    handlePosts()
  }, [])
  return user ? (
    <div className="grid col-4">
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          {post.content.length >= 1000 ? (
            <p>{post.content.substring(0, 1000)}...</p>
          ) : (
            <p>{post.content}</p>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="protected">
      <h3>You are not signed in!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Feed
