document.querySelectorAll(".menuToggle").forEach((el)=>{
    el.addEventListener("click", ()=>{
        document.querySelector("nav").classList.toggle("hide")
    })
})