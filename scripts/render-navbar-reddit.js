function renderRedditNavbar() {
  const navbarContainer = document.createElement('div');
  navbarContainer.id = 'navbar-div';

  const navbarUpperContainer = document.createElement('div');
  navbarUpperContainer.id = "upper-navbar-div";

  const redditLogoContainer = document.createElement('div');
  redditLogoContainer.id = 'reddit-logo-container';
  const redditLogo = document.createElement('img');
  redditLogo.id = 'reddit-logo-img';
  redditLogo.src = '../assets/icons/reddit-logo.jpg';
  const navbarTitle = document.createElement('a');
  navbarTitle.id = 'title';
  navbarTitle.innerText = 'Reddit';
  navbarTitle.href = 'http://127.0.0.1:5500/html/reddit.html';
  navbarTitle.target = '_self';

  const helpContainer = document.createElement('div');
  helpContainer.id = 'help-div';
  helpContainer.innerText = 'Help';

  const navbarLowerContainer = document.createElement('div');
  navbarLowerContainer.id = "lower-navbar-div";

  const loggedInUser = document.createElement('div');
  loggedInUser.id = 'logged-in-user-div';
  loggedInUser.innerText = 'Logged in as: Dzengiz';

  const changeUser = document.createElement('div');
  changeUser.id = 'change-user-div';
  changeUser.innerText = 'Change user';

  const settings = document.createElement('div');
  settings.id = 'settings-div';
  settings.innerText = 'Settings';

  const rightGroup = document.createElement('div');
  rightGroup.id = 'right-group';

  const messageContainer = document.createElement('div');
  messageContainer.id = 'messages-div';
  const notificationContainer = document.createElement('div');
  notificationContainer.id = 'notifications-div';

  navbarContainer.appendChild(navbarUpperContainer);
  navbarContainer.appendChild(navbarLowerContainer);
  navbarUpperContainer.appendChild(redditLogoContainer);
  navbarUpperContainer.appendChild(helpContainer);
  redditLogoContainer.appendChild(redditLogo);
  redditLogoContainer.appendChild(navbarTitle);

  navbarLowerContainer.appendChild(loggedInUser);
  navbarLowerContainer.appendChild(changeUser);
  navbarLowerContainer.appendChild(settings);

  rightGroup.appendChild(notificationContainer);
  rightGroup.appendChild(messageContainer);
  navbarLowerContainer.appendChild(rightGroup);


  document.body.appendChild(navbarContainer);
}

renderRedditNavbar();

console.log(renderRedditNavbar);