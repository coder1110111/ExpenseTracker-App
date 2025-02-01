async function checkUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwrd').value;
    try{
        const response = await fetch('http://localhost:1800/user/create-user' , {
            method:'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username, email, password})
        });
        console.log("Resquest Sent!");
        if(response.ok) {
            alert('User Created Successfully!')
            window.location.href="user.html";
        } else {
            if(response.status===409){
                alert("Email already in use!");
            } else if(response.status === 500) {
                alert("Error! Please visit website in some time!");
            }            
        }
    } catch {
        alert("Server Unavailable");
    }
    
}

async function checklogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwrd').value;
    try {
        const response = await fetch(`http://localhost:1800/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });
        const data = await response.json();
        alert(data.message);
    } catch(err) {
        alert("Error:", err);
    }
}
    
