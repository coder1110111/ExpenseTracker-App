async function checkUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwrd').value;
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
        location.reload();
    } else {
        alert('Error creating User.');
    }
}