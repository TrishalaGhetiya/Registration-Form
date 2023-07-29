const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');
    let userData = [];

    myForm.addEventListener("submit",onsubmit);
    userList.addEventListener('click',removeUser);
    
    window.addEventListener("DOMContentLoaded", () => {
        axios.get('https://crudcrud.com/api/d6aa24746acc42b9bb983719569092bf/Appointment')
                .then(res => {
                    //console.log(res.data)
                    for(let i=0;i<res.data.length;i++)
                    {
                        showNewUserOnScreen(res.data[i]);
                        userData.push(res.data[i]);
                        console.log(res.data[i])
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
        li.appendChild(document.createTextNode(`${data.user.Uname}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${data.user.email}`));
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
                Uname : nameInput.value,
                email : emailInput.value
            };
            //localStorage.setItem(nameInput.value,JSON.stringify(user));
            axios.post('https://crudcrud.com/api/d6aa24746acc42b9bb983719569092bf/Appointment',{
                 user
            })
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
                    if(userData[i].user.Uname === delUserName)
                    {
                        axios
                            .delete(`https://crudcrud.com/api/d6aa24746acc42b9bb983719569092bf/Appointment/${userData[i]._id}`)
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
                if(userData[i].user.Uname === updateUserName)
                {
                    nameInput.value=userData[i].user.Uname;
                    emailInput.value=userData[i].user.email;
                    axios
                        .delete(`https://crudcrud.com/api/d6aa24746acc42b9bb983719569092bf/Appointment/${userData[i]._id}`)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                        break;
                    }
                            
                }
            userList.removeChild(li1); 
        }
    }