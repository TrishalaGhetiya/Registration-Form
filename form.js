const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#userName');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');
    let userData = [];

    myForm.addEventListener("submit",onsubmit);
    userList.addEventListener('click',removeUser);
    
    window.addEventListener("DOMContentLoaded", () => {
        axios.get('http://localhost:3000/main-page')
                .then(res => {
                    //console.log(res.data[0].id);
                    for(let i=0;i<res.data.length;i++)
                    {
                        showNewUserOnScreen(res.data[i]);
                        userData.push(res.data[i]);
                        //console.log(res.data[i])
                    }
                })
                .catch(err => console.log(err))
    })

    function showNewUserOnScreen(data){
        const deleteBtn = document.createElement('button');
        deleteBtn.className='btn btn-sm btn-danger delete float-right';
        deleteBtn.appendChild(document.createTextNode('X'));

        const editButton = document.createElement('button');
        editButton.className= 'btn btn-sm btn-success float-right edit';
        editButton.appendChild(document.createTextNode('Edit'));

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${data.userName}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${data.email}`));
        li.appendChild(deleteBtn);
        li.appendChild(editButton);

        userList.appendChild(li);
    }

    function onsubmit(e)
    {
        e.preventDefault();
        if(nameInput.value==='' || emailInput.value==='')
        {
            msg.innerHTML="Please enter all fields";
            setTimeout(() => msg.remove(),3000);
        }
        else
        {
            const deleteBtn = document.createElement('button');
            deleteBtn.className='btn btn-sm btn-danger delete float-right';
            deleteBtn.appendChild(document.createTextNode('X'));

            const editButton = document.createElement('button');
            editButton.className= 'btn btn-sm btn-success float-right edit';
            editButton.appendChild(document.createTextNode('Edit'));

            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${nameInput.value}`));
            li.appendChild(document.createTextNode(' - '));
            li.appendChild(document.createTextNode(`${emailInput.value}`));
            li.appendChild(deleteBtn);
            li.appendChild(editButton);

            userList.appendChild(li);
            let user = {
                userName : nameInput.value,
                email : emailInput.value
            };
            //localStorage.setItem(nameInput.value,JSON.stringify(user));
            axios.post('http://localhost:3000/', user)
                .then(console.log('User added'))
                .catch(err => console.log(err))
                nameInput.value='';
                emailInput.value='';
            
        }
    }

    function removeUser(e)
    {
        if(e.target.classList.contains('delete'))
        {
            if(confirm('Sure??'))
            {
                const li = e.target.parentElement;
                const delUserName = li.firstChild.textContent;
                for(let i=0;i<userData.length;i++)
                {
                    if(userData[i].userName === delUserName)
                    {
                        axios
                            .delete(`http://localhost:3000/delete-user/${userData[i].id}`)
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                        break;
                    }
                            
                }
                userList.removeChild(li);
            }
        }
        if(e.target.classList.contains('edit'))
        {
            const li1 = e.target.parentElement;
            const updateUserName = li1.firstChild.textContent;
            for(let i=0;i<userData.length;i++)
            {
                if(userData[i].userName === updateUserName)
                {
                    nameInput.value=userData[i].userName;
                    emailInput.value=userData[i].email;
                    axios
                        .delete(`http://localhost:3000/delete-user/${userData[i].id}`)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                        break;
                    }
                            
                }
            userList.removeChild(li1); 
        }
    }