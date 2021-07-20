import axios from 'axios';
import { showAlert } from './alert.js';
export const signUp = async (
  firstName,
  secondName,
  email,
  password,
  confirmPassword
) => {
  // console.log(firstName, secondName, email, password, confirmPassword);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/signUp',
      data: {
        firstName,
        secondName,
        email,
        password,
        confirmPassword,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'SignedUp Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
