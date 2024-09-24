function route(event) {
  console.log(event);
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
}

const routes = {
  "/": "../pages/home.html",
  "/history": "../pages/history.html",
};

async function handleLocation() {
  const path = window.location.pathname;
  const route = routes[path];
  const data = await fetch(route);
  const html = await data.text();

  console.log(document.getElementsByTagName("main"));
  document.querySelector("main").innerHTML = html;
}
window.onpopstate = handleLocation;
window.route = route;

handleLocation();
