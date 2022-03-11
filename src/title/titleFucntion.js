
function titleFucntion(string,typeOfTitle) {
    if(typeOfTitle==='movie-detail'|| typeOfTitle==='movie-watch'){
        return string
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  
}

export default titleFucntion