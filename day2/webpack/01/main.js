import './first.js'
const btn = document.createElement("button")
btn.addEventListener("click", async() => {
   const myModule =await import ('./second.js');
   myModule.second()
})
btn.innerText = '懒加载'
document.body.appendChild(btn)