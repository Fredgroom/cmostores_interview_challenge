function renderTable() {
  const tbody = $('#dataTable tbody');
  tbody.empty();

  const query = $('#searchBox').val() || '';
  const filtered = filterTodos(query);

  filtered.forEach((todo) => {
    const completedIcon = todo.completed ? 'Yes' : 'No';
    tbody.append(`
        <tr data-id="${todo.id}">
          <td>${todo.id}</td>
          <td>${todo.title}</td>
          <td class="toggle-complete" style="cursor:pointer;">${completedIcon}</td>
        </tr>
      `);
  });
}

function filterTodos(query) {
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );
}
