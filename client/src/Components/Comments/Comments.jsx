import React, { useState, useEffect } from 'react'
import Client from '../../Services/api'

const Comment = (props) => {
  console.log('User props:', props.user)
  const [formValues, setFormValues] = useState({
    content: '',
    author: ''
  })
  const [comments, setComments] = useState([])
  const [editingComment, setEditingComment] = useState(null)
  const [editCommentContent, setEditCommentContent] = useState('')

  useEffect(() => {
    if (props.user && props.user.id) {
      setFormValues((fv) => ({ ...fv, author: props.user.id }))
    }
  }, [props.user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newComment = {
      content: formValues.content,
      author: formValues.author
    }
    if (!newComment.author) {
      return
    }

    try {
      console.log('Author ID', props.user.id)
      const response = await Client.post('/comments', newComment)
      setComments([...comments, response.data])
      setFormValues({ content: '' })
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, content: e.target.value })
  }

  const handleChangeEdit = (e) => {
    setEditCommentContent(e.target.value)
  }

  const handleEdit = (id) => {
    const commentEdit = comments.find((comment) => comment._id === id)
    setEditCommentContent(commentEdit.content)
    setEditingComment(id)
  }

  const handleUpdateComment = async (id) => {
    const updatedComment = {
      ...comments.find((comment) => comment._id === id),
      content: editCommentContent
    }

    try {
      await Client.put(`/comments/${id}`, updatedComment)
      setComments(
        comments.map((comment) =>
          comment._id === id ? updatedComment : comment
        )
      )
      setEditingComment(null)
      setEditCommentContent('')
    } catch (error) {
      console.error('Error updating comment:', error)
    }
  }

  const handleDeleteComment = async (id) => {
    try {
      await Client.delete(`/comments/${id}`)
      setComments(comments.filter((comment) => comment._id !== id))
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await Client.get('/comments')
        if (Array.isArray(response.data)) {
          setComments(response.data)
        } else {
          console.error('Response data is not an array:', response.data)
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    getComments()
  }, [])

  return (
    <div>
      <div className="comment-card">
        <h1>Comment</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="comment-text"
            placeholder="Comment text"
            cols={50}
            rows={5}
            onChange={handleChange}
            value={formValues.content}
          />
          <button className="comment-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <section className="new-comment-card">
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <div key={comment._id}>
              <h4>{comment.content}</h4>
              <button
                className="delete-comment-button"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
              <button
                className="edit-text-button"
                onClick={() => handleEdit(comment._id)}
              >
                Edit
              </button>
              {editingComment === comment._id && (
                <div>
                  <textarea
                    className="edit-comment-text"
                    placeholder="Edit text"
                    onChange={handleChangeEdit}
                    value={editCommentContent}
                  />
                  <button onClick={() => handleUpdateComment(comment._id)}>
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

export default Comment
