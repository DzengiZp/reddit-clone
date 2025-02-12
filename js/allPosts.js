const users = JSON.parse(localStorage.getItem("users")) || [];
const posts = JSON.parse(localStorage.getItem("posts")) || [];

export function renderPostsContainerForMain() {

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

export function renderPostsContainerForPost() {
  const mainPostsContainer = document.createElement('div');
  mainPostsContainer.id = "full-main-posts-container";

  const postContainer = document.createElement('div');
  postContainer.className = "full-posts-container";

  mainPostsContainer.appendChild(postContainer);

  const selectedPostId = localStorage.getItem("selectedPostId");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const selectedPost = posts.find(post => post.id == selectedPostId);

  const postHeader = document.createElement('div');
  postHeader.className = "post-header";
  postHeader.innerHTML = `
    <p class="post-header-topic">${selectedPost ? selectedPost.title : "Post not found"}</p>
  `;

  postContainer.appendChild(postHeader);

  const onePost = document.createElement('div');
  onePost.className = 'post-preview';
  onePost.innerHTML = `
    <p class="content-post">${selectedPost ? selectedPost.body : "No content available"}</p>
  `;

  postContainer.appendChild(onePost);

  const comments = document.createElement('div');
  comments.className = 'post-comments';

  const commentInputContainer = document.createElement('div');
  commentInputContainer.className = 'comment-input-container';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Write a comment...';
  commentInput.className = 'comment-input';

  const commentButton = document.createElement('button');
  commentButton.innerText = 'Post Comment';
  commentButton.className = 'comment-button';

  commentInputContainer.appendChild(commentInput);
  commentInputContainer.appendChild(commentButton);

  comments.appendChild(commentInputContainer);

  const commentsList = document.createElement('div');
  commentsList.className = 'comments-list';
  comments.appendChild(commentsList);

  postContainer.appendChild(comments);

  function loadComments() {
    commentsList.innerHTML = '';
    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    const postComments = allComments.filter(comment => comment.postId == selectedPostId);

    postComments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `<p><strong>${comment.username}:</strong> ${comment.text}</p>`;
      commentsList.appendChild(commentDiv);
    });
  }

  commentButton.addEventListener('click', () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      alert("You need to select a user in the navbar before commenting.");
      return;
    }

    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const newComment = {
      postId: selectedPostId,
      username: loggedInUser,
      text: commentText
    };

    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    allComments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(allComments));

    commentInput.value = '';
    loadComments();
  });

  loadComments();

  return mainPostsContainer;
}


function allPosts(postContainer) {
  posts.forEach(post => {
    const user = users.find(user => user.id === post.userId);
    const username = user ? user.firstName : "Unknown";
    const limitedText = post.body.length > 60 ? post.body.substring(0, 60) + "..." : post.body;

    const onePost = document.createElement('div');
    onePost.className = "one-post";

    onePost.innerHTML = `
      <p class="user-id">Post creator: <span class="username">${username}</span></p>
      <p class="post-title" data-id="${post.id}" style="cursor:pointer; text-decoration:underline;">${post.id}. ${post.title}</p>
      <p class="post-body">${limitedText}</p>
      <p class="post-reactions">Upvotes: <span class=" post-reactions-likes">${post.reactions.likes}</span></p>
      <p class="post-reactions">Downvotes: <span class="post-reactions-dislikes">${post.reactions.dislikes}</span></p>
    `;

    const titleElement = onePost.querySelector(".post-title");
    titleElement.addEventListener("click", () => {
      localStorage.setItem("selectedPostId", post.id);
      window.location.href = "../html/postPage.html";
    });

    postContainer.appendChild(onePost);
  });
}
