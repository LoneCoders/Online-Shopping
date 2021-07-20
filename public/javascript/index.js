import '@babel/polyfill';
import { login } from './login.js';
import { signUp } from './signUp.js';
//DOM ELEMENTS
const loginForm = document.querySelector('.loginform');
const signUpForm = document.querySelector('.signUpForm');
//DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('fname').value;
    const secondName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    // console.log(firstName, secondName, email, password, confirmPassword);
    signUp(firstName, secondName, email, password, confirmPassword);
  });
}
