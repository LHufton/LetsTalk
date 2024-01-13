import React, { useState, useEffect } from 'react'
import Client from '../../Services/api'

const Post = (props) => {
  const [formValues, setFormValues] = useState({ content: '', author: '' })
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [editPostContent, setEditPostContent] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      content: formValues.content,
      author: props.user.id
    }

    console.log('Creating new post:', newPost) // Debugging line

    try {
      console.log('Author ID', props.user.id)
      let response = await Client.post('/posts', newPost)
      setPosts([...posts, response.data])
      setFormValues({ content: '' })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, content: e.target.value })
  }

  const handleChangeEdit = (e) => {
    setEditPostContent(e.target.value)
  }

  const handleEdit = (id) => {
    const postEdit = posts.find((post) => post._id === id)
    setEditPostContent(postEdit.content)
    setEditingPost(id)
  }

  const handleUpdatePost = async (id) => {
    const updatedPost = {
      ...posts.find((post) => post._id === id),
      content: editPostContent
    }

    try {
      await Client.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map((post) => (post._id === id ? updatedPost : post)))
      setEditingPost(null)
      setEditPostContent('')
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleDeletePost = async (id) => {
    try {
      await Client.delete(`/posts/${id}`)
      setPosts(posts.filter((post) => post._id !== id))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        let response = await Client.get('/posts')
        if (Array.isArray(response.data)) {
          setPosts(response.data)
        } else {
          console.error('Response data is not an array:', response.data)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    getPosts()
  }, [])

  return (
    <div>
      <h1>What's on your mind?</h1>
      <div className="post-card">
        <form className="post-content-form" onSubmit={handleSubmit}>
          <textarea
            className="post-text-input"
            placeholder="Post text"
            cols={15}
            rows={5}
            onChange={handleChange}
            value={formValues.content}
          />
          <button className="post-form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <section className="new-post-card">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post._id}>
              <h4>{post.content}</h4>
              <button
                className="delete-post-button"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete
              </button>
              <button
                className="edit-post-button"
                onClick={() => handleEdit(post._id)}
              >
                Edit
              </button>
              {editingPost === post._id && (
                <div>
                  <textarea
                    className="edit-post-text"
                    placeholder="Edit text"
                    onChange={handleChangeEdit}
                    value={editPostContent}
                  />
                  <button
                    className="update-post-button"
                    onClick={() => handleUpdatePost(post._id)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))}
      </section>
    </div>
  )
}

export default Post
