import Client from './api'

export const GetPosts = async () => {
  const res = await Client.get('/posts')
  return res.data
}

export const CreatePosts = async (postData) => {
  const res = await Client.post('/posts', postData)
  return res.data
}

export const UpdatePosts = async (postId, postData) => {
  const res = await Client.put(`/posts/${postId}`, postData)
  return res.data
}

export const DeletePosts = async (postId) => {
  const res = await Client.delete(`/posts/${postId}`)
  return res.data
}
