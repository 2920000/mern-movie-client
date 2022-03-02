import axios from "axios";
import instance from "./axiosConfig";
export const  category={
    movie:'movie',
    tv:'tv'
}
export const movieType={
    latest:'latest',
    now_playing:'now_playing',
    popular:'popular',
    top_rated:'top_rated',
    upcoming:'upcoming',
    trending:'trending'
}
export const tvType={
    popular:'popular',
    top_rated:'top_rated',
    on__the_air:'on_the_air'
}
const tmdbApi={
    getTrendingMoives:(params)=>{
       const url='trending/all/day'
       return instance.get(url,params)
    },
    getMovieDiscover:(params)=>{
        const url =`discover/movie`
        return instance.get(url,params)
    },
    getMovieList:(type,params)=>{
        const url='movie/' + movieType[type]
        return instance.get(url,params)
    },
    getTvList:(type,params)=>{
         const url='tv/'+ tvType[type]
         return instance.get(url,params)
    },
    getVideos:(cate,id,params)=>{
        const url =category[cate]+ '/'+ id +'/videos'
        return instance.get(url,params)
    },
    search:(params)=>{
        // const url='search/' + category[cate]
        const url= 'search/multi'
        return instance.get(url,params)
    },
    getMovieDetail:(cate,id,params)=>{
        const url=category[cate] +'/'+ id
        return instance.get(url,params)
    },
    getMovieCredits:(cate,id,params)=>{
         const url=category[cate] + '/' + id +'/credits'
         return instance.get(url,params)
    },
    getMovieSimilar:(cate,id,params)=>{
         const url=category[cate] + '/' + id + '/similar'
         return instance.get(url,params)
    },
    getTranslations:(cate,id,params)=>{
        const url=category[cate] + '/' +id+'/translations'
        return  instance.get(url,params)
    }
}

export default  tmdbApi