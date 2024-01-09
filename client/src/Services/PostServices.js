import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreatePosts = async () => {
  try {
    const res = await Client.post('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdatePosts = async () => {
  try {
    const res = await Client.put('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}
export const DeletePosts = async () => {
  try {
    const res = await Client.delete('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}
