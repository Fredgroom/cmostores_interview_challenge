$(document).ready(function () {
  fetchTodos(() => {
    renderTable();
  });
});
