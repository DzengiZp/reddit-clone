import { renderNavbar } from "./navbar.js";
import { renderPostButtons } from "./buttons.js";
import { renderPosts } from "./posts.js";

function renderRedditPage() {
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";

  mainContainer.appendChild(renderNavbar());
  mainContainer.appendChild(renderPostButtons());
  mainContainer.appendChild(renderPosts());

  document.body.appendChild(mainContainer);
}

renderRedditPage();
