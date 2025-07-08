function renderTable() {
  const tbody = $('#dataTable tbody');

  todos.forEach((todo) => {
    tbody.append(`
      <tr>
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td>${todo.completed ? 'Yes' : 'No'}</td>
      </tr>`);
  });
}
