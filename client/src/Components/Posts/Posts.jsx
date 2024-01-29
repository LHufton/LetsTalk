import React, { useState, useEffect } from 'react'
import Client from '../../Services/api'

const Post = (props) => {
  const [formValues, setFormValues] = useState({
    content: '',
    author: ''
  })
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [editPostContent, setEditPostContent] = useState('')
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    if (props.user) {
      setFormValues((fv) => ({ ...fv, author: props.user.id }))
    }
  }, [props.user])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await Client.get('/posts')
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])

  const handleChange = (e) => {
    setFormValues({ ...formValues, content: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await Client.post('/posts', formValues)
      setPosts([...posts, response.data])
      setFormValues({ content: '', author: props.user ? props.user.id : '' })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post._id === id)
    setEditPostContent(postToEdit.content)
    setEditingPost(id)
  }

  const handleChangeEdit = (e) => {
    setEditPostContent(e.target.value)
  }

  const handleUpdatePost = async (id) => {
    try {
      let response = await Client.put(`/posts/${id}`, {
        content: editPostContent
      })
      setPosts(posts.map((post) => (post._id === id ? response.data : post)))
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

  const handleAddComment = async (postId, commentContent) => {
    try {
      await Client.post('/comments', { content: commentContent, post: postId })
      setNewComment('')
      fetchPosts()
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

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
        console.log(posts)
        {posts.comments?.map((post) => (
          <div key={post._id}>
            <h4>{post.content}</h4>
            {editingPost === post._id ? (
              <div>
                <textarea
                  className="edit-post-text"
                  placeholder="Edit text"
                  onChange={handleChangeEdit}
                  value={editPostContent}
                />
                <button onClick={() => handleUpdatePost(post._id)}>
                  Update
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => handleEdit(post._id)}>Edit</button>
                <button onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              </>
            )}
            <div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => handleAddComment(post._id, newComment)}>
                Add Comment
              </button>
            </div>
            {post.comments.map((comment) => (
              <div key={comment._id}>{comment.content}</div>
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}

export default Post
