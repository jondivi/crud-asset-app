// const { response } = require("express")

//This is going to listen for when we click the 'update-button' in the index.ejs
const update = document.querySelector('#update-button')

//This is going to listen for when we click the 'delete-button' in the index.ejs
const deleteButton=document.querySelector('#delete-button')

//This is going to be where we designate 'messages' for when there is nothing left to delete
const messageDiv=document.querySelector('#message')


//And this is going to perform an update action for us
update.addEventListener('click', _ => {
    //The PUT Request will go here
    fetch('/items',{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Apple',
            model: 'MacBook Air'
        })
    })
        .then(response=>{
            if (response.ok) return response.json()
        })
        .then(response=>{
            window.location.reload(true)
            // console.log(response)
        })
})


//This is going to perform a delete action for us
deleteButton.addEventListener('click',_=>{
    fetch('/items',{
        method: 'delete',
        headers:{ 'Content-Type': 'aplication/json'},
        body:JSON.stringify({
            name: 'take'
        })
    })
    .then(response=>{
        if(response.ok) return response.json()
    })
    .then(response=>{
        if(response==='No items to delete'){
            messageDiv.textContent= 'No more items to delete'
        } else{
            window.location.reload(true)
        }
    })
    .catch(console.error)
    // .then(data=>{
    //     window.location.reload()
    // })
})





