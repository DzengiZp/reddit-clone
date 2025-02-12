const users = JSON.parse(localStorage.getItem("users")) || [];
const posts = JSON.parse(localStorage.getItem("posts")) || [];

export function renderPostsContainer() {

  const mainPostsContainer = document.createElement('div');
  mainPostsContainer.id = "main-posts-container";

  const postContainer = document.createElement('div');
  postContainer.className = "posts-container";

  mainPostsContainer.appendChild(postContainer);

  const postHeader = document.createElement('div');
  postHeader.className = "post-header";
  postHeader.innerHTML =
    `
  <p class="post-header-title">POSTS</p>
  `

  postContainer.appendChild(postHeader);

  console.log(posts);

  allPosts(postContainer);

  return mainPostsContainer;
}

function allPosts(postContainer) {
  posts.forEach(post => {
    const user = users.find(user => user.id === post.id);
    const username = user ? user.firstName : "Unknown";
    const limitedText = post.body.length > 60 ? post.body.substring(0, 60) + "..." : post.body;
    const onePost = document.createElement('div');
    onePost.className = "one-post";
    onePost.innerHTML =
      ` <p class="user-id">Post creator: <span class="username">${username}</span></p>
        <p class="post-title">${post.id}. ${post.title}</p>
        <p class="post-body">${limitedText}</p>
        <p class="post-reactions">Upvotes: <span class=" post-reactions-likes">${post.reactions.likes}</span></p>
        <p class="post-reactions">Downvotes: <span class="post-reactions-dislikes">${post.reactions.dislikes}</span></p>
        
      `;
    postContainer.appendChild(onePost);
  });
}