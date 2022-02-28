function useModal(overlayRef,setState) {
window.addEventListener('mousedown',event=>{
    if(overlayRef.current){
        if(event.target===overlayRef.current){
                setState(false)
      }
    }
})   
  
}

export default useModal