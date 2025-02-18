async function checkForget(event){
    event.preventDefault();

    const email= document.querySelector('#email').value;
    //Debug: console.log('email: ', email);
    const response = await fetch( 'http://localhost:1800/password/forgotPassword', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email })
    });
    if(response.ok) {
        alert('Link Sent!');

    }  else if(response.status === 404) {
        alert('User does not exist in the system! Please try a registered Email.');
    }  else {
        alert('Something went Wrong!');
    }


}