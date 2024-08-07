document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.complete-btn');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const li = this.closest('li');
        const taskId = li.getAttribute('data-id');
  
        fetch(`/complete/${taskId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            li.remove();
          } else {
            console.error('Failed to complete task');
          }
        })
        .catch(error => console.error('Error:', error));
      });
    });
  });
  