$(document).ready(function () {
  fetchTodos(() => {
    renderTable();
  });

  $('#dataSearch').on('submit', function (e) {
    e.preventDefault();
    renderTable();
  });

  $('#dataTable').on('click', '.toggle-complete', function () {
    const row = $(this).closest('tr');
    const id = parseInt(row.data('id'));

    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      renderTable();
    }
  });
});
