import Client from './api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}

export const getComments = async () => {
  const res = await Client.get('/comments', { headers: getAuthHeaders() })
  return res.data
}

export const createComments = async (comment) => {
  const res = await Client.post('/comments', comment, {
    headers: getAuthHeaders()
  })
  return res.data
}

export const updateComments = async (commentsId, comment) => {
  const res = await Client.put(`/comments/${commentsId}`, comment, {
    headers: getAuthHeaders()
  })
  return res.data
}

export const deleteComments = async (commentsId) => {
  const res = await Client.delete(`/comments/${commentsId}`, {
    headers: getAuthHeaders()
  })
  return res.data
}
