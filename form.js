const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');
    
    myForm.addEventListener("submit",onsubmit);
    userList.addEventListener('click',removeUser);
    
    
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
            axios.post('https://crudcrud.com/api/a5f96a5777964f35835e6e50d5f0437a/Appointment',{
                data: user
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
                localStorage.removeItem(li.firstChild.textContent);
                userList.removeChild(li);
            }
        }
        if(e.target.classList.contains('edit'))
        {
            const li1 = e.target.parentElement;
            const user = JSON.parse(localStorage.getItem(li1.firstChild.textContent));
            nameInput.value=user.Uname;
            emailInput.value=user.email;
            localStorage.removeItem(li1.firstChild.textContent);
            userList.removeChild(li1);
            
            
            
        }
    }