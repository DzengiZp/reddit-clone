function renderPostButtons() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.id = "posts-buttons-container";

  const leftSide = document.createElement('div');
  leftSide.className = "post-buttons-left-side";

  const seeAllPostsButton = document.createElement('button');
  seeAllPostsButton.innerText = "See All Posts";

  const searchBox = document.createElement('input');
  searchBox.className = "search-box";
  searchBox.type = "text";
  searchBox.placeholder = "Search here";

  const searchButton = document.createElement('button');
  searchButton.innerText = "Search";

  leftSide.appendChild(seeAllPostsButton);
  leftSide.appendChild(searchBox);
  leftSide.appendChild(searchButton);

  const rightSide = document.createElement('div');
  rightSide.className = "post-buttons-right-side";

  const createPostButton = document.createElement('button');
  createPostButton.innerText = "Create New Post";

  rightSide.appendChild(createPostButton);

  buttonsContainer.appendChild(leftSide);
  buttonsContainer.appendChild(rightSide);

  return buttonsContainer;
}

export { renderPostButtons };
