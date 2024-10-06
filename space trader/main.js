if (localStorage.name) {
  document.getElementById('name').innerHTML = localStorage.name;
} else {
  this_good = false;
  while (!this_good) {
    localStorage.name = prompt('Name your trading company to start.');
    this_good = confirm('Are you sure?');
  }
  document.getElementById('name').innerHTML = localStorage.name;
}
