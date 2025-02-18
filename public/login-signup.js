
async function checkUser(event) {           //for User Sign-Up
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwrd').value;
    const repeatpassword = document.getElementById('repeat_passwrd').value;
    const errorPassword = document.getElementById('error');
    const premiumUser = document.getElementById('checkPremium');
    const is_Premium = premiumUser.checked;
    //console.log(premiumUser);
    console.log(is_Premium);
    if(password !== repeatpassword) {
        errorPassword.innerHTML = "<span style='color: red;'>" + "Password does not match!</span>"
    } else {
        try{
            const response = await fetch('http://localhost:1800/user/create-user' , {
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({username, email, password, is_Premium})
            });
            console.log("Resquest Sent!");
            if(response.ok) {
                alert('User Created Successfully!')
                
                window.location.href = 'login';
                
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
            if(data.message == "Login Successful!"){
                if(data.token){
                    localStorage.setItem("token", data.token);
                    window.location.href = "tracker.html";
                }
            }
        
        alert(data.message);
        
        
    } catch(err) {
        alert("Error(404): Server not Found");
    }
}
    
