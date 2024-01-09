import Client from './api'

export const GetComments = async () => {
  try {
    const res = await Client.get('/comments')
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateComments = async (comment) => {
  try {
    const res = await Client.post('/comments')
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateComments = async (comment) => {
  try {
    const res = await Client.put(`/comments/${comments_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteComments = async (comments_id) => {
  try {
    const res = await Client.delete(`/comments/${comments_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
