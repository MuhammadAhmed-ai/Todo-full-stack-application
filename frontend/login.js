async function login(event) {
    event.preventDefault()

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailValue = email.value;
    const passwordValue = password.value;

    const loginData = {
        email :emailValue,
        password: passwordValue
    }

    const response = await fetch("https://todo-full-stack-application-production.up.railway.app/api/login" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify(loginData)
    })

    const data = await response.json()
    console.log(data)


    const message = document.getElementById("message");

    if(data.status === true){
        message.innerText = data.message;
        localStorage.setItem("token" , data.token)
        localStorage.setItem("user" , JSON.stringify(data.data))
        console.log(data.data)
        window.location.href = "dashboard.html";
    }else {
        message.innerText = data.message;
    }
}