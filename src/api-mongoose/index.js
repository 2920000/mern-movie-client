import axios from "axios"
const URL='https://movie-app-lethanh.herokuapp.com'

const postComment=(payload)=>axios.post(`${URL}/movie/`,payload)
const getComments=(movieId)=>axios.get(`${URL}/movie/${movieId}`)
const postReplyComment=(payload,movieId)=>axios.post(`${URL}/movie/${movieId}/reply`,payload)
const checkAccount=(payload,type)=>axios.post(`${URL}/user/${type}`,payload)


export {postComment,getComments,postReplyComment,checkAccount}