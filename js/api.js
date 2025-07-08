let todos = [];

function fetchTodos(callback) {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    success: function (data) {
      todos = data;
      callback();
    },
    error: function () {
      alert('Failed to fetch todos');
    },
  });
}
