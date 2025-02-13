export function renderPostsContainerForMain() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const mainPostsContainer = document.createElement('div');
  mainPostsContainer.id = "main-posts-container";

  const postContainer = document.createElement('div');
  postContainer.className = "posts-container";

  mainPostsContainer.appendChild(postContainer);

  const postHeader = document.createElement('div');
  postHeader.className = "post-header";
  postHeader.innerHTML = `<p class="post-header-title">POSTS</p>`;

  postContainer.appendChild(postHeader);

  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination-container";
  mainPostsContainer.appendChild(paginationContainer);

  let currentPage = 1;
  const postsPerPage = 4;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  function loadPosts(page) {
    postContainer.innerHTML = '';
    postContainer.appendChild(postHeader);

    const startIndex = (page - 1) * postsPerPage;
    const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage);

    allPosts(postContainer, users, selectedPosts);

    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerText = i;
      pageButton.className = "page-button";
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        currentPage = i;
        loadPosts(currentPage);
      });

      paginationContainer.appendChild(pageButton);
    }
  }

  loadPosts(currentPage);

  return mainPostsContainer;
}

function allPosts(postContainer, users, posts) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  posts.forEach(post => {
    const user = users.find(user => user.id === post.userId);
    const username = user ? user.firstName : "Unknown";
    const limitedText = post.body.length > 60 ? post.body.substring(0, 60) + `... <span class="see-more-button">See More</span>` : post.body;

    const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
    const userVote = userVotes[`${loggedInUser}-${post.id}`] || null;

    const onePost = document.createElement('div');
    onePost.className = "one-post";

    onePost.innerHTML = `
      <p class="user-id">Post creator: <span class="username">${username}</span></p>
      <p class="post-title" data-id="${post.id}" style="cursor:pointer;">${post.title}</p>
      <p class="post-body">${limitedText}</p>
      <p class="tags" style="font-size: 0.8rem;"><span style="font-weight: bold;">Tags: </span><em>${post.tags}</em></p>
      <div class="reaction-container">
        <button class="upvote-button upvote ${userVote === 'up' ? 'active' : ''}" data-id="${post.id}">⬆</button>
        <span class="post-reactions-likes" data-id="${post.id}">${post.reactions.likes}</span>
        <button class="downvote-button downvote ${userVote === 'down' ? 'active' : ''}" data-id="${post.id}">⬇</button>
        <span class="post-reactions-dislikes" data-id="${post.id}">${post.reactions.dislikes}</span>
      </div>
    `;

    const upvoteButton = onePost.querySelector(".upvote");
    const downvoteButton = onePost.querySelector(".downvote");

    upvoteButton.addEventListener("click", () => handleVote(post.id, "up"));
    downvoteButton.addEventListener("click", () => handleVote(post.id, "down"));

    const titleElement = onePost.querySelector(".post-title");
    titleElement.addEventListener("click", () => {
      localStorage.setItem("selectedPostId", post.id);
      window.location.href = "../html/postPage.html";
    });

    postContainer.appendChild(onePost);
  });
}

function handleVote(postId, type) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) return;

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
  const userVoteKey = `${loggedInUser}-${postId}`;
  const previousVote = userVotes[userVoteKey];

  if (previousVote === type) {
    userVotes[userVoteKey] = null;
    if (type === "up") post.reactions.likes--;
    else post.reactions.dislikes--;
  } else {
    userVotes[userVoteKey] = type;
    if (type === "up") {
      post.reactions.likes++;
      if (previousVote === "down") post.reactions.dislikes--;
    } else {
      post.reactions.dislikes++;
      if (previousVote === "up") post.reactions.likes--;
    }
  }

  localStorage.setItem("posts", JSON.stringify(posts));
  localStorage.setItem("userVotes", JSON.stringify(userVotes));

  updatePostReactions(postId);
}

function updatePostReactions(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const likeCount = document.querySelector(`.post-reactions-likes[data-id="${postId}"]`);
  const dislikeCount = document.querySelector(`.post-reactions-dislikes[data-id="${postId}"]`);
  const upvoteElement = document.querySelector(`.upvote[data-id="${postId}"]`);
  const downvoteElement = document.querySelector(`.downvote[data-id="${postId}"]`);

  if (likeCount && dislikeCount) {
    likeCount.innerText = post.reactions.likes;
    dislikeCount.innerText = post.reactions.dislikes;

    const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userVote = userVotes[`${loggedInUser}-${postId}`];

    upvoteElement.classList.toggle("active", userVote === "up");
    downvoteElement.classList.toggle("active", userVote === "down");
  }
}

