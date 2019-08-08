const token = localStorage.getItem('token');
const bearer = 'Bearer ' + token;

if (token) {
  const configuration = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    }
  };

  fetch('http://localhost:3000/me', configuration)
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      document.getElementById('menu').innerHTML =
        '<ul> <li><a href="index.html" id="logout-button">Log Out</a></li> </ul>';

      document.getElementById(
        'blocked-content'
      ).innerHTML = `<p>Welcome <strong>${
        response.username
      }</strong>! You are logged as <strong>${response.email}</strong></p>`;

      document.getElementById('blocked-info').innerHTML =
        '<p class="section">We are a PropTech start - up from Berlin that transforms temporarily unused commercial space into flexible workspace for creative teams and coworking.</p>';

      document
        .getElementById('logout-button')
        .addEventListener('click', function() {
          localStorage.setItem('token', '');
          location.href('index.html');
        });
    })
    .catch((err) => console.log(err));
}
