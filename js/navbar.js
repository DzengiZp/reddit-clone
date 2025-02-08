export function renderNavbar() {
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
  loggedInUser.innerText = "Dzengiz";
  const changeUser = document.createElement('a');
  changeUser.className = "change-user";
  changeUser.innerText = "Change User";
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

