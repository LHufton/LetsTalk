import Client from './api'

export const GetPosts = async () => {
  const token = localStorage.getItem('token')
  const res = await Client.get('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

// export const CreatePosts = async (postData) => {
//   const token = localStorage.getItem('token')
//   const res = await Client.post('/posts', postData, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   return res.data
// }

// export const UpdatePosts = async (postId, postData) => {
//   const token = localStorage.getItem('token')
//   const res = await Client.put(`/posts/${postId}`, postData, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   return res.data
// }

// export const DeletePosts = async (postId) => {
//   const token = localStorage.getItem('token')
//   const res = await Client.delete(`/posts/${postId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   return res.data
// }
