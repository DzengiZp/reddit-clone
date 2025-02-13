import { renderNavbar } from "../js/navbar.js";
import { renderPostButtons } from "../js/buttons.js";
import { renderPostsContainerForMain } from "../js/allPosts.js";
import { GetUsersFromDummyJson, GetCommentsFromDummyJson, GetPostsFromDummyJson } from '../data/api-fetches.js';

async function loadData() {
  const users = await GetUsersFromDummyJson();
  localStorage.setItem("users", JSON.stringify(users));

  const posts = await GetPostsFromDummyJson();
  localStorage.setItem("posts", JSON.stringify(posts));

  const comments = await GetCommentsFromDummyJson();
  localStorage.setItem("comments", JSON.stringify(comments));
}

async function renderRedditPage() {
  if (document.getElementById("main-posts-container")) return;

  await loadData();

  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";

  mainContainer.appendChild(renderNavbar());
  mainContainer.appendChild(renderPostButtons());
  mainContainer.appendChild(renderPostsContainerForMain());

  document.body.appendChild(mainContainer);
}


renderRedditPage();
