const socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio=new Audio('ting.mp3');

const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    if(position=='left')
    {
    audio.play()
    }
}





form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append('you:${message}', 'right');
    socket.emit('send',message);
    messageContainer.value="";

})


const name=prompt("Enter Your name to join")
socket.emit('new-user-joined',name)//this the name to index.js in the function we can print the name using console.log

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')

})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})



