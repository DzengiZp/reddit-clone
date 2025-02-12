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

  const reactionContainer = document.createElement('div');
  reactionContainer.className = 'reaction-container';

  const loggedInUser = localStorage.getItem("loggedInUser");
  const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
  const userVote = userVotes[`${loggedInUser}-${selectedPostId}`] || null;

  reactionContainer.innerHTML = `
    <button class="vote-button upvote ${userVote === 'up' ? 'active' : ''}" data-id="${selectedPostId}">⬆</button>
    <span class="post-reactions-likes" data-id="${selectedPostId}">${selectedPost.reactions.likes}</span>
    <button class="vote-button downvote ${userVote === 'down' ? 'active' : ''}" data-id="${selectedPostId}">⬇</button>
    <span class="post-reactions-dislikes" data-id="${selectedPostId}">${selectedPost.reactions.dislikes}</span>
  `;

  postContainer.appendChild(reactionContainer);

  const upvoteButton = reactionContainer.querySelector(".upvote");
  const downvoteButton = reactionContainer.querySelector(".downvote");

  upvoteButton.addEventListener("click", () => handleVote(selectedPostId, "up"));
  downvoteButton.addEventListener("click", () => handleVote(selectedPostId, "down"));

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

  function createCommentElement(comment) {
    if (!comment.username || !comment.text) return;

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<p><strong>${comment.username}:</strong> ${comment.text}</p>`;

    const replyButton = document.createElement('button');
    replyButton.innerText = "Reply";
    replyButton.className = "reply-button";
    commentDiv.appendChild(replyButton);

    const repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies-container';
    commentDiv.appendChild(repliesContainer);

    replyButton.addEventListener('click', () => {
      const existingReplyInput = commentDiv.querySelector('.reply-input');
      if (existingReplyInput) return;

      const replyInput = document.createElement('input');
      replyInput.type = 'text';
      replyInput.placeholder = 'Reply to this comment...';
      replyInput.className = 'reply-input';

      const replySubmit = document.createElement('button');
      replySubmit.innerText = 'Reply';
      replySubmit.className = 'reply-submit';

      repliesContainer.appendChild(replyInput);
      repliesContainer.appendChild(replySubmit);

      replySubmit.addEventListener('click', () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
          alert("You need to select a user in the navbar before commenting.");
          return;
        }

        const replyText = replyInput.value.trim();
        if (replyText === "") return;

        const newReply = {
          id: Date.now(),
          postId: selectedPostId,
          username: loggedInUser,
          text: replyText,
          parentId: comment.id,
        };

        const allComments = JSON.parse(localStorage.getItem("comments")) || [];
        allComments.push(newReply);
        localStorage.setItem("comments", JSON.stringify(allComments));

        replyInput.value = '';
        loadComments();
      });
    });

    return commentDiv;
  }

  function loadComments() {
    commentsList.innerHTML = '';

    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    const postComments = allComments.filter(comment => comment.postId == selectedPostId && !comment.parentId);

    function renderNestedComments(parentId, container) {
      const replies = allComments.filter(comment => comment.parentId === parentId);
      replies.forEach(reply => {
        const replyDiv = createCommentElement(reply);
        replyDiv.classList.add('nested-comment');
        container.appendChild(replyDiv);
        renderNestedComments(reply.id, replyDiv);
      });
    }

    postComments.forEach(comment => {
      const commentDiv = createCommentElement(comment);
      commentsList.appendChild(commentDiv);
      renderNestedComments(comment.id, commentDiv);
    });

    setTimeout(() => {
      commentsList.scrollTop = commentsList.scrollHeight;
    }, 100);
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
