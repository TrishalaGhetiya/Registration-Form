const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');
    const pass = document.querySelector("#pass");
    const confirmpass = document.querySelector("#confirmpass");
    
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

            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${nameInput.value}`));
            li.appendChild(deleteBtn);
            userList.appendChild(li);
            let user = {
                Uname : nameInput.value,
                email : emailInput.value
            };
            localStorage.setItem(nameInput.value,JSON.stringify(user));
            //localStorage.setItem(nameInput.value,emailInput.value);
            nameInput.value='';
            emailInput.value='';
            pass.value='';
            confirmpass.value='';
            
        }
    }

    function removeUser(e)
    {
        if(e.target.classList.contains('delete'))
        {
            if(confirm('Sure??'))
            {
                const li = e.target.parentElement;
                const liData = e.target.firstChild.value;
                localStorage.removeItem(liData);
                userList.removeChild(li);
                
            }
        }
    }