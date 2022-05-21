/*
    Author:         Arielle Riray
    Here is the JS file for the for validation fields for the Login Page
*/

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

document.getElementById("bttn").addEventListener("click",  e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	var p = 0, e = 0;
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
		e = 1;
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
		p = 1;
	}

	if(p == 1 && e == 1) {
		location.href = ("../MainPages/shop.html")
	}
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'loginValidation error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'loginValidation success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
