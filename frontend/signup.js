async function signup(event){
    event.preventDefault()

    const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const password = document.getElementById("password");

const firstnameValue = firstname.value;
const lastnameValue = lastname.value;
const genderValue = gender.value;
const emailValue = email.value;
const passwordValue = password.value;

// User ki saari signup information ko
// ek hi object ke andar collect kar rahe hain
const signupData = {
    firstname: firstnameValue,
    lastname: lastnameValue,
    gender: genderValue,
    email: emailValue,
    password: passwordValue
};


const response = await fetch("https://todo-full-stack-application-production.up.railway.app/sign-up", {
    method : "POST",
    headers : {
        "Content-type" : "application/json"
    },
    // signupData object ko JSON format mein
    // convert karke backend ko bhej rahe hain
    body : JSON.stringify(signupData)

})

const data = await response.json()

const message = document.getElementById("message");
console.log(data)
if(data.status === true){
    message.innerText = data.message
    window.location.href = "login.html"
}else {
        message.innerText = data.message

}
}




