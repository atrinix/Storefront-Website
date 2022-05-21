/*
    Author:         Arielle Riray
    Here is the JS file for the for validation fields for the membership Page
*/

const email = document.getElementById('m-email');
const username = document.getElementById('m-username');
const password = document.getElementById('m-password');
const password2 = document.getElementById('m-password2');
const phone1 = document.getElementById('m-phone1');
const phone2 = document.getElementById('m-phone2');
const fname= document.getElementById('m-firstname');
const lname = document.getElementById('m-lastname');

document.getElementById("bttn").addEventListener("click",  e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	var count = 0;
	var CheckName = /^(?!-)(?!.*-$ )[a-zA-Z-]+$/;
	var CheckNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	const filterEmail = email.value.trim();
	const filterUsername = username.value.trim();
	const filterPassword = password.value.trim();
	const filterPassword2 = password2.value.trim();
	const filterPhone1 = phone1.value.trim();
	const filterPhone2 = phone2.value.trim();
	const filterFname = fname.value.trim();
	const filerLname = lname.value.trim();
	
	if(filterEmail === '') {
		NotValid(email, 'Email cannot be blank');
	} else if (!isEmail(filterEmail)) {
		NotValid(email, 'Not a valid email');
	} else {
		Validate(email);
		count++;
	}
	
	if(filterUsername === '') {
		NotValid(username, 'Username cannot be blank');
	} else {
		Validate(username);
		count++;
	}

	if(filterPassword === '') {
		NotValid(password, 'Password cannot be blank');
	} else {
		Validate(password);
		count++;
	}

	if(filterPassword2 === '') {
		NotValid(password2, 'Confirm password cannot be blank');
	}  else if(filterPassword !== filterPassword2) {
		NotValid(password2, 'Passwords does not match');
	} else{
		Validate(password2);
		count++;
	}

	if(filterPhone1 === '') {
		NotValid(phone1, 'Phone Number cannot be blank');
	} else if(CheckNumber.test(filterPhone1)) {
	   	Validate(phone1);
		count++;
	 } else {
	   NotValid(phone1, "Not a valid Phone Number");
	}

	if(filterPhone2 === '') {
		NotValid(phone2, 'Phone Number 2 cannot be blank');
	} else if(CheckNumber.test(filterPhone2)) {
	   	Validate(phone2);
		count++;
	 } else {
	   NotValid(phone2, "Not a valid Phone Number");
	}

	if(filterFname === '') {
		NotValid(fname, 'First name cannot be blank');
	} 
	else if(CheckName.test(filterFname)){
		Validate(fname);
		count++;
	} else {
		NotValid(fname, 'Invalid first name given.');
	}

	if(filerLname === '') {
		NotValid(lname, 'Last name cannot be blank');
	} else if(!CheckName.test(filerLname)){
		NotValid(lname, 'Invalid last name given.');
	} else {
		Validate(lname);
		count++;
	}

	//Counts until all fields are valid before user can move forward in membership process
	if(count == 8) {
		location.href = ("../MainPages/ConfirmMembership.html");
	}

}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function Validate(input) {
	const formControl = input.parentElement;
	formControl.className = 'membershipValidation success';
}
	
function NotValid(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'membershipValidation error';
	small.innerText = message;
}
