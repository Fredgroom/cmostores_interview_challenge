function renderTable() {
  const tbody = $('#dataTable tbody');
  tbody.empty();

  todos.forEach((todo) => {
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
