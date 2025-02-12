import { renderNavbar } from "./navbar.js";
import { renderPostButtons } from "./buttons.js";
import { renderPostsContainer } from "./allPosts.js";
import { GetUsersFromDummyJson, GetCommentsFromDummyJson, GetPostsFromDummyJson } from '../data/api-fetches.js';

async function renderRedditPage() {
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";

  const users = await GetUsersFromDummyJson();
  console.log(users);
  const posts = await GetPostsFromDummyJson();
  const comments = await GetCommentsFromDummyJson();

  mainContainer.appendChild(renderNavbar());
  mainContainer.appendChild(renderPostButtons());
  mainContainer.appendChild(renderPostsContainer());


  document.body.appendChild(mainContainer);
}

renderRedditPage();