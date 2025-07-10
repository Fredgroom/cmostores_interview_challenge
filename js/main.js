let currentSortColumn = null;
let currentSortDirection = 'asc';

$(document).ready(function () {
  fetchTodos(() => {
    renderTable();
  });

  $('#dataSearch').on('submit', function (e) {
    e.preventDefault();
    renderTable();
  });

  $('#dataTable thead').on('click', 'th.sortable', function () {
    const sortBy = $(this).data('sort');
    if (currentSortColumn === sortBy) {
      currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      currentSortColumn = sortBy;
      currentSortDirection = 'asc';
    }
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
