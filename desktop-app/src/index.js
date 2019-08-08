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

      document.getElementById('blocked-content').innerText = `User with id ${
        response._id
      } has been authenticated. Your email is: ${response.email}`;

      document.getElementById('blocked-info').innerHTML =
        '<p> We are a PropTech start - up from Berlin that transforms temporarily unused commercial space into flexible workspace for creative teams andcoworking.</p>';

      document
        .getElementById('logout-button')
        .addEventListener('click', function() {
          localStorage.setItem('token', '');
          location.href('index.html');
        });
    })
    .catch((err) => console.log(err));
}
