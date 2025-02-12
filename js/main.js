import { renderNavbar } from "./navbar.js";
import { renderPostButtons } from "./buttons.js";
import { renderPosts } from "./posts.js";
import { GetUsersFromDummyJson, GetCommentsFromDummyJson, GetPostsFromDummyJson } from '../data/api-fetches.js';

async function renderRedditPage() {
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";

  mainContainer.appendChild(renderNavbar());
  mainContainer.appendChild(renderPostButtons());
  mainContainer.appendChild(renderPosts());

  const users = await GetUsersFromDummyJson();
  const comments = await GetCommentsFromDummyJson();
  const posts = await GetPostsFromDummyJson();

  document.body.appendChild(mainContainer);
}

renderRedditPage();