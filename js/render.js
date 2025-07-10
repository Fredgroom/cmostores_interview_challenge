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

  const totalPages = Math.ceil(filtered.length / todosPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * todosPerPage;
  const end = start + todosPerPage;
  const todosToShow = filtered.slice(start, end);

  todosToShow.forEach((todo) => {
    const completedIcon = todo.completed ? 'Yes' : 'No';
    tbody.append(`
        <tr data-id="${todo.id}">
          <td>${todo.id}</td>
          <td>${todo.title}</td>
          <td class="toggle-complete" style="cursor:pointer;">${completedIcon}</td>
        </tr>
      `);
  });

  renderPagination(totalPages);
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

function renderPagination(totalPages) {
  const pagination = $('#pagination');
  pagination.empty();

  if (totalPages <= 1) return;

  const maxButtons = 10;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxButtons) {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = maxButtons;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - maxButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  if (currentPage > 1) {
    pagination.append(`
      <li class="page-item">
        <a href="#" class="page-link" data-page="first">First</a>
      </li>
    `);
  }

  for (let i = startPage; i <= endPage; i++) {
    const activeClass = i === currentPage ? 'active' : '';
    pagination.append(`
      <li class="page-item ${activeClass}">
        <a href="#" class="page-link" data-page="${i}">${i}</a>
      </li>
    `);
  }

  if (currentPage < totalPages) {
    pagination.append(`
      <li class="page-item">
        <a href="#" class="page-link" data-page="last">Last</a>
      </li>
    `);
  }
}
