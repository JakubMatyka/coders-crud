// By convention this file must be placed in exactly this named folder

const update = document.getElementById('switch');
const deleteEntry = document.getElementById('delete');

update.addEventListener('click', () => {
  console.info('Button has been clicked!');
  fetch('book', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': 'What the funk?!',
      'description': 'Funk!'
    })
  }).then((response) => {
    console.info(response);
    window.location.reload()
  }).catch((err) => {
    console.error(err)
  })
});

deleteEntry.addEventListener('click', () => {
  console.warn('You are about to delete database entry!');
  fetch('book', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: 'What the funk?!'
    })
  }).then((response) => {
    console.info(response);
    window.location.reload()
  })
  .catch((err) => {
    console.error(err)
  })
});