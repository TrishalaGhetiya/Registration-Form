const myForm = document.querySelector('#my-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msg = document.querySelector('.msg');
    const userList = document.querySelector('#users');
    const pass = document.querySelector("#pass");
    const confirmpass = document.querySelector("#confirmpass");
    
    myForm.addEventListener("submit",onsubmit);
    //localStorage.setItem('name','bob');
    localStorage.removeItem('name');
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
            //const li = document.createElement('li');
            //li.appendChild(document.createTextNode(`${nameInput.value}`));
            //userList.appendChild(li);
            let user = {
                Uname : nameInput.value,
                email : emailInput.value
            };
            localStorage.setItem('user',JSON.stringify(user));
            //localStorage.setItem(nameInput.value,emailInput.value);
            nameInput.value='';
            emailInput.value='';
            pass.value='';
            confirmpass.value='';
            
        }
    }