let currentSortColumn = null;
let currentSortDirection = 'asc';
const todosPerPage = 10;
let currentPage = 1;

$(document).ready(function () {
  fetchTodos(() => {
    renderTable();
  });

  $('#pagination').on('click', 'a.page-link', function (e) {
    e.preventDefault();
    const page = $(this).data('page');

    if (page === 'first') {
      currentPage = 1;
    } else if (page === 'last') {
      currentPage = Math.ceil(
        filterTodos($('#searchBox').val() || '').length / todosPerPage
      );
    } else {
      const selectedPage = parseInt(page);
      if (selectedPage !== currentPage) {
        currentPage = selectedPage;
      }
    }
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
