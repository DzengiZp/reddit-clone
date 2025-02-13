import { openCreatePostForm } from "../js/create-new-post.js";

export function renderPostButtons() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.id = "posts-buttons-container";

  const leftSide = document.createElement('div');
  leftSide.className = "post-buttons-left-side";

  const seeAllPostsButton = document.createElement('button');
  seeAllPostsButton.innerText = "See All Posts";

  seeAllPostsButton.addEventListener('click', () => {
    document.body.innerHTML = "";
    window.location.href = "../html/main-page.html";
  });

  const searchBox = document.createElement('input');
  searchBox.className = "search-box";
  searchBox.type = "text";
  searchBox.placeholder = "This function has not been implemented yet.";

  const searchButton = document.createElement('button');
  searchButton.innerText = "Search";

  leftSide.appendChild(seeAllPostsButton);
  leftSide.appendChild(searchBox);
  leftSide.appendChild(searchButton);

  const rightSide = document.createElement('div');
  rightSide.className = "post-buttons-right-side";

  const createPostButton = document.createElement('button');
  createPostButton.innerText = "Create New Post";
  createPostButton.addEventListener("click", openCreatePostForm);

  rightSide.appendChild(createPostButton);

  buttonsContainer.appendChild(leftSide);
  buttonsContainer.appendChild(rightSide);

  return buttonsContainer;
}
