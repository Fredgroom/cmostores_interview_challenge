function renderTable() {
  const tbody = $('#dataTable tbody');
  tbody.empty();

  $('#dataTable thead th.sortable .arrow').text('');
  if (currentSortColumn) {
    const arrow = currentSortDirection === 'asc' ? ' ▲' : ' ▼';
    $(
      `#dataTable thead th.sortable[data-sort="${currentSortColumn}"] .arrow`
    ).text(arrow);
  }
  const query = $('#searchBox').val() || '';
  let filtered = filterTodos(query);
  filtered = sortTodos(filtered);

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

function sortTodos(todosToSort) {
  if (!currentSortColumn) return todosToSort;

  return todosToSort.slice().sort((a, b) => {
    let valA = a[currentSortColumn];
    let valB = b[currentSortColumn];

    if (currentSortColumn === 'completed') {
      valA = valA ? 1 : 0;
      valB = valB ? 1 : 0;
    }

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}
