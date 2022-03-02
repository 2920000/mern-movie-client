import axios from "axios";
import Qs from 'query-string'
import apiConfig from "./apiConfig";
const instance=axios.create({
    baseURL:apiConfig.bareUrl,
    paramsSerializer:params=>{
        return Qs.stringify({...params,api_key:apiConfig.API_KEY,language:'vi-VN'})
    }
})
export default instance

instance.interceptors.request.use(config=>config)
instance.interceptors.response.use(res=>{
    if(res&&res.data)  return res.data
    else  return res
  
    
},err=>{throw err})