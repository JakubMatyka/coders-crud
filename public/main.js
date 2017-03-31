// By convention this file must be placed in exactly this named folder

const update = document.getElementById('switch');

update.addEventListener('click', function () {
  console.info('Button has been clicked!');
  fetch('book', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': 'What the funk?!',
      'description': 'Funk!'
    })
  })
    .then(function (response) {
      console.info(response);
      window.location.reload()
    })
    .catch((err) => {
      console.error(err)
    })
});