import { openEditPostForm } from '../js/post-page.js';

export function renderPostsContainerForPost() {
  const mainPostsContainer = document.createElement('div');
  mainPostsContainer.id = "full-main-posts-container";

  const postContainer = document.createElement('div');
  postContainer.className = "full-posts-container";

  mainPostsContainer.appendChild(postContainer);

  const selectedPostId = localStorage.getItem("selectedPostId");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const selectedPost = posts.find(post => post.id == selectedPostId);
  const postCreator = users.find(user => user.id === selectedPost.userId);
  const loggedInUser = localStorage.getItem("loggedInUser");

  const postHeader = document.createElement('div');
  postHeader.className = "post-header";
  postHeader.innerHTML = `
    <p class="post-header-topic"></p>
  `;
  console.log(selectedPost.title);

  postContainer.appendChild(postHeader);

  const onePost = document.createElement('div');
  onePost.className = 'post-preview';
  onePost.innerHTML = `
    <p class="content-post"></p>
  `;

  postContainer.appendChild(onePost);

  const postInformationContainer = document.createElement('div');
  postInformationContainer.className = 'post-information-container';

  const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
  const userVote = userVotes[`${loggedInUser}-${selectedPostId}`] || null;

  postInformationContainer.innerHTML = `
  <div class="reaction-container">
    <button class="upvote-button upvote ${userVote === 'up' ? 'active' : ''}" data-id="${selectedPostId}">⬆</button>
    <span class="post-reactions-likes" data-id="${selectedPostId}">${selectedPost.reactions.likes}</span>
    <button class="downvote-button downvote ${userVote === 'down' ? 'active' : ''}" data-id="${selectedPostId}">⬇</button>
    <span class="post-reactions-dislikes" data-id="${selectedPostId}">${selectedPost.reactions.dislikes}</span>
  </div>
    <span class="post-user">Created by: ${postCreator ? postCreator.firstName : "Unknown"}</span>
    <span class="post-tags"></span>
    <button class="edit-post-button">Edit Post</button>
`;

  postContainer.appendChild(postInformationContainer);

  const upvoteButton = postInformationContainer.querySelector(`.upvote[data-id="${selectedPostId}"]`);
  const downvoteButton = postInformationContainer.querySelector(`.downvote[data-id="${selectedPostId}"]`);


  if (upvoteButton && downvoteButton) {
    upvoteButton.addEventListener("click", function () {
      handleVote(selectedPostId, "up");
    });
    downvoteButton.addEventListener("click", function () {
      handleVote(selectedPostId, "down");
    });
  }

  const editPostButton = postInformationContainer.querySelector(".edit-post-button");

  if (editPostButton) {
    editPostButton.addEventListener("click", () => {
      if (loggedInUser !== (postCreator ? postCreator.firstName : "")) {
        return;
      }
      openEditPostForm(selectedPost);
    });
  }

  if (loggedInUser !== (postCreator ? postCreator.firstName : "")) {
    editPostButton.classList.add("disabled-edit");
  } else {
    editPostButton.classList.remove("disabled-edit");
  }


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
  commentButton.addEventListener("click", addNewComment);

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
      renderComment(comment, commentsList);
    });
  }

  function renderComment(comment, parentElement) {
    if (document.querySelector(`[data-id="${comment.id}"]`)) return;

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.dataset.id = comment.id;
    commentDiv.innerHTML = `
        <p><strong>${comment.username}:</strong> ${comment.text}</p>
    `;

    parentElement.appendChild(commentDiv);
  }

  function addNewComment() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("You need to select a user before commenting.");
      return;
    }

    const commentInput = document.querySelector(".comment-input");
    const commentsList = document.querySelector(".comments-list");

    if (!commentInput || !commentsList) return;

    const commentText = commentInput.value.trim();
    if (commentText === "") {
      alert("Comment cannot be empty!");
      return;
    }

    const newComment = {
      id: Date.now(),
      postId: selectedPostId,
      username: loggedInUser,
      text: commentText
    };

    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    allComments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(allComments));

    commentInput.value = '';

    renderComment(newComment, commentsList);
  }
  loadComments();

  const paragraphTitle = document.createElement('p');
  paragraphTitle.innerText = selectedPost.title;
  const paragraphBody = document.createElement('p');
  paragraphBody.innerText = selectedPost.body;
  const paragraphTags = document.createElement('p');
  paragraphTags.innerText = selectedPost.tags.length > 0 ? `Tags: ${selectedPost.tags.join(', ')}` : "No tags";
  mainPostsContainer.querySelector('.post-header-topic').appendChild(paragraphTitle);
  mainPostsContainer.querySelector('.content-post').appendChild(paragraphBody);
  mainPostsContainer.querySelector('.post-tags').appendChild(paragraphTags);

  return mainPostsContainer;
}


function handleVote(postId, type) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("You need to select a user before voting.");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let post = posts.find(p => p.id == postId);
  if (!post) return;

  let userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
  let userVoteKey = `${loggedInUser}-${postId}`;
  let previousVote = userVotes[userVoteKey];

  if (previousVote === type) {
    userVotes[userVoteKey] = null;
    if (type === "up") post.reactions.likes = Math.max(0, post.reactions.likes - 1);
    if (type === "down") post.reactions.dislikes = Math.max(0, post.reactions.dislikes - 1);
  } else {
    userVotes[userVoteKey] = type;
    if (type === "up") {
      post.reactions.likes++;
      if (previousVote === "down") post.reactions.dislikes = Math.max(0, post.reactions.dislikes - 1);
    } else {
      post.reactions.dislikes++;
      if (previousVote === "up") post.reactions.likes = Math.max(0, post.reactions.likes - 1);
    }
  }

  localStorage.setItem("posts", JSON.stringify(posts));
  localStorage.setItem("userVotes", JSON.stringify(userVotes));

  updatePostReactions(postId);
}

function updatePostReactions(postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let post = posts.find(p => p.id == postId);
  if (!post) return;

  let likeCount = document.querySelector(`.post-reactions-likes[data-id="${postId}"]`);
  let dislikeCount = document.querySelector(`.post-reactions-dislikes[data-id="${postId}"]`);
  let upvoteButton = document.querySelector(`.upvote-button[data-id="${postId}"]`);
  let downvoteButton = document.querySelector(`.downvote-button[data-id="${postId}"]`);

  if (likeCount && dislikeCount) {
    likeCount.innerText = post.reactions.likes;
    dislikeCount.innerText = post.reactions.dislikes;

    let userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
    let loggedInUser = localStorage.getItem("loggedInUser");
    let userVote = userVotes[`${loggedInUser}-${postId}`];

    if (upvoteButton) upvoteButton.classList.toggle("active", userVote === "up");
    if (downvoteButton) downvoteButton.classList.toggle("active", userVote === "down");
  }
}