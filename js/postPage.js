import { renderNavbar } from "../js/navbar.js";
import { renderPostButtons } from "../js/buttons.js";
import { renderPostsContainerForPost } from "../js/comments.js";
import { GetUsersFromDummyJson, GetCommentsFromDummyJson, GetPostsFromDummyJson } from '../data/api-fetches.js';

if (window.location.pathname.includes("postPage.html")) {
  renderRedditPage();
}

document.addEventListener("userChanged", (event) => {
  updateEditPostButton(event.detail.user);
});

export function updateEditPostButton(loggedInUser) {
  const selectedPostId = localStorage.getItem("selectedPostId");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const selectedPost = posts.find(post => post.id == selectedPostId);

  if (!selectedPost) return;


  const postCreator = users.find(user => user.id === selectedPost.userId);
  const editButton = document.querySelector(".edit-post-button");

  if (editButton) {
    editButton.style.display = "inline-block";

    if (loggedInUser === (postCreator ? postCreator.firstName : "")) {
      editButton.classList.remove("disabled-edit");
      editButton.disabled = false;
    } else {
      editButton.classList.add("disabled-edit");
      editButton.disabled = true;
    }
  }
}


async function renderRedditPage() {
  if (document.getElementById("main-container")) return;

  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";

  const users = await GetUsersFromDummyJson();
  const posts = await GetPostsFromDummyJson();
  const comments = await GetCommentsFromDummyJson();

  mainContainer.appendChild(renderNavbar());
  mainContainer.appendChild(renderPostButtons());
  mainContainer.appendChild(renderPostsContainerForPost());

  document.body.appendChild(mainContainer);
}



export function openEditPostForm(selectedPost) {
  const existingForm = document.getElementById("edit-post-form");
  if (existingForm) {
    existingForm.remove();
    return;
  }

  const updatedTitle = document.querySelector(".post-header-topic").innerText;
  const updatedContent = document.querySelector(".content-post").innerText;
  const updatedTags = document.querySelector(".post-tags").innerText.replace("Tags: ", "");

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.id = "edit-post-form";

  const formContainer = document.createElement("div");
  formContainer.className = "form-container";

  formContainer.innerHTML = `
      <h2>Edit Post</h2>
      <label for="edit-post-title">Title:</label>
      <input type="text" id="edit-post-title" value="${updatedTitle}" required>

      <label for="edit-post-content">Content:</label>
      <textarea id="edit-post-content" required>${updatedContent}</textarea>

      <label for="edit-post-tags">Tags (comma separated):</label>
      <input type="text" id="edit-post-tags" value="${updatedTags}">

      <button id="save-edit-post">Save Changes</button>
      <button id="close-edit-form">Cancel</button>
  `;

  overlay.appendChild(formContainer);
  document.body.appendChild(overlay);

  document.getElementById("close-edit-form").addEventListener("click", () => {
    overlay.remove();
  });

  document.getElementById("save-edit-post").addEventListener("click", () => savePostChanges(selectedPost.id));
}

function savePostChanges(postId) {
  const title = document.getElementById("edit-post-title").value.trim();
  const content = document.getElementById("edit-post-content").value.trim();
  const tags = document.getElementById("edit-post-tags").value.trim().split(",").map(tag => tag.trim());

  if (!title || !content) {
    alert("Title and Content cannot be empty.");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex !== -1) {
    posts[postIndex].title = title;
    posts[postIndex].body = content;
    posts[postIndex].tags = tags.length > 0 && tags[0] !== "" ? tags : [];

    localStorage.setItem("posts", JSON.stringify(posts));

    document.querySelector(".post-header-topic").innerText = title;
    document.querySelector(".content-post").innerText = content;
    document.querySelector(".post-tags").innerText = `Tags: ${tags.join(", ")}`;

    document.getElementById("edit-post-form").remove();
  }
}

