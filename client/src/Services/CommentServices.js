import Client from './api'

// Helper function to get headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}

export const GetComments = async () => {
  const res = await Client.get('/comments', { headers: getAuthHeaders() })
  return res.data
}

export const CreateComments = async (comment) => {
  const res = await Client.post('/comments', comment, {
    headers: getAuthHeaders()
  })
  return res.data
}

export const UpdateComments = async (comments_id, comment) => {
  const res = await Client.put(`/comments/${comments_id}`, comment, {
    headers: getAuthHeaders()
  })
  return res.data
}

export const DeleteComments = async (comments_id) => {
  const res = await Client.delete(`/comments/${comments_id}`, {
    headers: getAuthHeaders()
  })
  return res.data
}
