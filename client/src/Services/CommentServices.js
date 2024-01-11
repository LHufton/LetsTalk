import Client from './api'

export const GetComments = async () => {
  const token = localStorage.getItem('token')
  const res = await Client.get('/comments', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const CreateComments = async (comment) => {
  const token = localStorage.getItem('token')
  const res = await Client.post('/comments', comment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const UpdateComments = async (comments_id, comment) => {
  const token = localStorage.getItem('token')
  const res = await Client.put(`/comments/${comments_id}`, comment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const DeleteComments = async (comments_id) => {
  const token = localStorage.getItem('token')
  const res = await Client.delete(`/comments/${comments_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
