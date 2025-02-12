export function renderNavbar() {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const navbarContainer = document.createElement('div');
  navbarContainer.className = 'navbar-container';

  const upperNavbar = document.createElement('div');
  upperNavbar.className = "upper-navbar-container";

  const upperLeft = document.createElement('div');
  upperLeft.className = "upper-left-side";
  const linkDiv = document.createElement('a');
  linkDiv.href = "/html.reddit.html";
  const imgDiv = document.createElement('div');
  imgDiv.className = "img-div";
  const image = document.createElement('img');
  image.className = "image-logo";
  image.src = "../assets/icons/reddit.svg";
  const titleDiv = document.createElement('div');
  titleDiv.className = "title-div";
  const titleLogo = document.createElement('a');
  titleLogo.innerText = 'Reddit';
  titleLogo.className = "title-logo";
  titleLogo.href = '/html/reddit.html';

  upperLeft.appendChild(imgDiv);
  upperLeft.appendChild(linkDiv);
  imgDiv.appendChild(image);
  upperLeft.appendChild(titleDiv);
  titleDiv.appendChild(titleLogo);

  const upperRight = document.createElement('div');
  upperRight.className = "upper-right-side";
  const faqDiv = document.createElement('div');
  faqDiv.className = "help-div";
  faqDiv.innerText = "FAQ";
  const helpDiv = document.createElement('div');
  helpDiv.className = "help-div";
  helpDiv.innerText = "Help";

  upperRight.appendChild(faqDiv);
  upperRight.appendChild(helpDiv);

  upperNavbar.appendChild(upperLeft);
  upperNavbar.appendChild(upperRight);

  const lowerNavbar = document.createElement('div');
  lowerNavbar.className = "lower-navbar-container";

  const lowerLeft = document.createElement('div');
  lowerLeft.className = "lower-left-side";
  const loggedInUser = document.createElement('a');
  loggedInUser.className = "logged-in-user";
  loggedInUser.innerText = "Choose User";
  const savedUser = localStorage.getItem("loggedInUser");
  if (savedUser) {
    loggedInUser.innerText = savedUser;
  }

  const changeUser = document.createElement('a');
  changeUser.className = "change-user";
  changeUser.innerHTML = "Change user";

  changeUser.addEventListener('click', toggleUserSelect);

  const settings = document.createElement('a');
  settings.className = "settings";
  settings.innerText = "Settings";

  lowerLeft.appendChild(loggedInUser);
  lowerLeft.appendChild(changeUser);
  lowerLeft.appendChild(settings);

  const lowerRight = document.createElement('div');
  lowerRight.className = "lower-right-side";
  const notifications = document.createElement('a');
  notifications.className = "notifications";
  notifications.innerText = "Notifications";
  const messages = document.createElement('a');
  messages.className = "messages";
  messages.innerText = "Messages";

  lowerRight.appendChild(notifications);
  lowerRight.appendChild(messages);

  lowerNavbar.appendChild(lowerLeft);
  lowerNavbar.appendChild(lowerRight);

  navbarContainer.appendChild(upperNavbar);
  navbarContainer.appendChild(lowerNavbar);

  return navbarContainer;
}

function toggleUserSelect() {
  const changeUser = document.querySelector(".change-user");
  const loggedInUser = document.querySelector(".logged-in-user");
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userSelect = document.createElement('select');

  userSelect.className = "user-select";

  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.firstName;
    option.innerText = user.firstName;
    userSelect.appendChild(option);
  });

  userSelect.addEventListener('change', () => {
    loggedInUser.innerHTML = userSelect.value;
    localStorage.setItem('loggedInUser', userSelect.value);

    changeUser.style.display = "inline";
    userSelect.remove();
  });

  changeUser.style.display = 'none';
  changeUser.parentNode.insertBefore(userSelect, changeUser);

  document.addEventListener("click", function closeDropdown(event) {
    if (!userSelect.contains(event.target) && event.target !== changeUser) {
      userSelect.remove();
      changeUser.style.display = "inline";
      document.removeEventListener("click", closeDropdown);
    }
  });
}
