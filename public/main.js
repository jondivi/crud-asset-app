//This is going to listen for when we click the 'update-button' in the index.ejs

update.addEventListener('click',_=>{
    //The PUT Request will go here
    fetch('assets',{
        method: 'put',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            name: 'Apple',
            model: 'MacBook Air'
        })
    })
})