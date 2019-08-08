const form = document.querySelector('form');
const handleSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const configuration = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  };
  return fetch('http://localhost:3000/signup', configuration)
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem('token', response.token);
      window.location.href = 'index.html';
    })
    .catch((err) => {
      document.getElementById('form-message').innerHTML =
        '<p>Unable to create an account</p>';
    });
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

form.addEventListener('submit', handleSubmit);
