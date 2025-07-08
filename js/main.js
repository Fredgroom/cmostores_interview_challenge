$(document).ready(function () {
  fetchTodos(() => {
    console.log('Todos fetched:', todos);
  });
});
