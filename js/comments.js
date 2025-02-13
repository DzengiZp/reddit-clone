import { openEditPostForm } from '../js/postPage.js';

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
    <p class="post-header-topic">${selectedPost ? selectedPost.title : "Post not found"}</p>
  `;

  postContainer.appendChild(postHeader);

  const onePost = document.createElement('div');
  onePost.className = 'post-preview';
  onePost.innerHTML = `
    <p class="content-post">${selectedPost ? selectedPost.body : "No content available"}</p>
  `;

  postContainer.appendChild(onePost);

  const reactionContainer = document.createElement('div');
  reactionContainer.className = 'reaction-container';

  const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
  const userVote = userVotes[`${loggedInUser}-${selectedPostId}`] || null;

  reactionContainer.innerHTML = `
    ${voteButtonsHTML(userVote, selectedPostId, selectedPost)}
    <span class="post-tags post-tags-content">Tags: ${selectedPost.tags.length > 0 ? selectedPost.tags.join(", ") : "None"}</span>
    <span class="post-user">Created by: ${postCreator ? postCreator.firstName : "Unknown"}</span>
    <button class="edit-post-button">Edit Post</button>
`;


  postContainer.appendChild(reactionContainer);

  const upvoteButton = reactionContainer.querySelector(".upvote");
  const downvoteButton = reactionContainer.querySelector(".downvote");

  upvoteButton.addEventListener("click", () => handleVote(selectedPostId, "up"));
  downvoteButton.addEventListener("click", () => handleVote(selectedPostId, "down"));

  const editPostButton = reactionContainer.querySelector(".edit-post-button");

  if (editPostButton) {
    editPostButton.addEventListener("click", () => {
      if (loggedInUser !== (postCreator ? postCreator.firstName : "")) {
        alert("You can only edit your own posts!");
        return;
      }
      openEditPostForm(selectedPost);
    });
  }

  editPostButton.style.display = "inline-block";

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
    const postComments = allComments.filter(comment => comment.postId == selectedPostId && !comment.parentId);

    postComments.forEach(comment => {
      renderComment(comment, commentsList, allComments);
    });

    setTimeout(() => {
      commentsList.scrollTop = commentsList.scrollHeight;
    }, 100);
  }

  function renderComment(comment, parentElement, allComments) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <p><strong>${comment.username}:</strong> ${comment.text}</p>
        <button class="reply-button" data-id="${comment.id}">Reply</button>
        <div class="nested-comments" id="nested-${comment.id}"></div>
    `;

    parentElement.appendChild(commentDiv);

    const replyButton = commentDiv.querySelector(".reply-button");
    replyButton.addEventListener("click", () => showReplyInput(comment.id));

    const nestedContainer = commentDiv.querySelector(`#nested-${comment.id}`);
    const replies = allComments.filter(c => c.parentId == comment.id);

    replies.forEach(reply => {
      renderComment(reply, nestedContainer, allComments);
    });
  }


  let activeReplyBox = null;

  function showReplyInput(commentId) {
    const nestedContainer = document.getElementById(`nested-${commentId}`);

    if (activeReplyBox && activeReplyBox !== nestedContainer) {
      activeReplyBox.innerHTML = "";
    }

    if (nestedContainer.querySelector(".reply-input")) {
      nestedContainer.innerHTML = "";
      activeReplyBox = null;
      return;
    }

    const replyBox = document.createElement("div");
    replyBox.innerHTML = `
        <input type="text" class="reply-input" placeholder="Write a reply...">
        <button class="reply-submit" data-parent="${commentId}">Submit</button>
    `;

    nestedContainer.appendChild(replyBox);
    activeReplyBox = nestedContainer;

    const submitButton = replyBox.querySelector(".reply-submit");
    submitButton.addEventListener("click", () => submitReply(commentId));
  }



  function submitReply(parentId) {
    const nestedContainer = document.getElementById(`nested-${parentId}`);
    const replyInput = nestedContainer.querySelector(".reply-input");

    const replyText = replyInput.value.trim();
    if (replyText === "") return;

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("You need to select a user in the navbar before commenting.");
      return;
    }


    const newReply = {
      id: Date.now(),
      postId: selectedPostId,
      parentId: parentId,
      username: loggedInUser,
      text: replyText
    };

    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    allComments.push(newReply);
    localStorage.setItem("comments", JSON.stringify(allComments));

    replyInput.value = '';
    loadComments();
  }

  commentButton.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("You need to select a user in the navbar before commenting.");
      return;
    }

    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const newComment = {
      id: Date.now(),
      postId: selectedPostId,
      username: loggedInUser,
      text: commentText,
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

function voteButtonsHTML(userVote, selectedPostId, selectedPost,) {
  const inner = `<button class="vote-button upvote ${userVote === 'up' ? 'active' : ''}" data-id="${selectedPostId}">⬆</button>
    <span class="post-reactions-likes" data-id="${selectedPostId}">${selectedPost.reactions.likes}</span>
    <button class="vote-button downvote ${userVote === 'down' ? 'active' : ''}" data-id="${selectedPostId}">⬇</button>
    <span class="post-reactions-dislikes" data-id="${selectedPostId}">${selectedPost.reactions.dislikes}</span>`;

  return inner;
}