async function newFormHandler(event) {
  event.preventDefault();

  const user_story = document.querySelector('#user_story').value;
  const user_name = document.querySelector('#user_name').value;

  const response = await fetch(`/api/story`, {
    method: 'POST',
    body: JSON.stringify({
      user_story,
      user_name,
      user_id,
      
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add story');
  }
}

document
  .querySelector('.new-story-form')
  .addEventListener('submit', newFormHandler);
