export function openCreatePostForm() {
  const existingForm = document.getElementById("create-post-form");
  if (existingForm) {
    existingForm.remove();
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.id = "create-post-form";

  const formContainer = document.createElement("div");
  formContainer.className = "form-container";

  formContainer.innerHTML = `
    <h2>Create New Post</h2>
    <label for="post-title">Title:</label>
    <input type="text" id="post-title" placeholder="Enter post title" required>

    <label for="post-content">Content:</label>
    <textarea id="post-content" placeholder="Enter post content" required></textarea>

    <label for="post-user">Select User:</label>
    <select id="post-user">
      <option value="" disabled selected>Choose a user</option>
    </select>

    <label for="post-tags">Tags (comma separated):</label>
    <input type="text" id="post-tags" placeholder="e.g., C#, Databaser, Frontend, Backend">

    <button id="submit-post">Create Post</button>
    <button id="close-form">Cancel</button>
  `;

  overlay.appendChild(formContainer);
  document.body.appendChild(overlay);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userSelect = document.getElementById("post-user");

  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.innerText = user.firstName;
    userSelect.appendChild(option);
  });

  document.getElementById("close-form").addEventListener("click", () => {
    overlay.remove();
  });

  document.getElementById("submit-post").addEventListener("click", createNewPost);
}

function createNewPost() {
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();
  const userId = document.getElementById("post-user").value;
  const tags = document.getElementById("post-tags").value.trim().split(",").map(tag => tag.trim());

  if (!title || !content || !userId || !tags) {
    alert("Please fill in all required fields.");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const newPost = {
    id: Date.now(),
    title: title,
    body: content,
    userId: Number(userId),
    reactions: { likes: 0, dislikes: 0 },
    tags: tags.length > 0 && tags[0] !== "" ? tags : []
  };

  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("create-post-form").remove();
  window.location.reload();
}
