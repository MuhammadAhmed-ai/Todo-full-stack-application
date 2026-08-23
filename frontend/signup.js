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

// Backend ke signup API ko request bhej rahe hain
// const response = await fetch("http://localhost:5000/sign-up",{

// method ppost hai 
//     method : "POST",

 // Backend ko bata rahe hain ke
    // hum JSON format mein data bhej rahe hain
//     headers :{
//         "Content-type": "application/json"
//     },

//     bosy : JSON.stringify(signupData)
// })

const response = await fetch("http://localhost:5000/sign-up", {
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




