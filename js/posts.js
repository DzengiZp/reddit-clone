function renderPosts() {
  const postsContainer = document.createElement('div');
  postsContainer.id = "posts-container";

  const postsHeader = document.createElement('div');
  postsHeader.id = "posts-rows";

  const topicTitleContainer = document.createElement('div');
  topicTitleContainer.className = "topic-title-container";
  const topicTitle = document.createElement('p');
  topicTitle.className = "topic-title";
  topicTitle.innerText = "Topic Title";

  topicTitleContainer.appendChild(topicTitle);

  const authorContainer = document.createElement('div');
  authorContainer.className = "author-container";
  const authorUser = document.createElement('p');
  authorUser.className = "author-user";
  authorUser.innerText = "Author";

  authorContainer.appendChild(authorUser);

  const viewsContainer = document.createElement('div');
  viewsContainer.className = "views-container";
  const viewsCounter = document.createElement('p');
  viewsCounter.className = "views-counter";
  viewsCounter.innerText = "Views";

  viewsContainer.appendChild(viewsCounter);

  postsHeader.appendChild(topicTitleContainer);
  postsHeader.appendChild(authorContainer);
  postsHeader.appendChild(viewsContainer);

  postsContainer.appendChild(postsHeader);

  const postData = ["asdasd", "Post 1", "Post 2", "Post 3", "Post 1", "Post 2", "Post 3", "Post 1", "Post 2"];

  postData.forEach(postText => {
    const post = document.createElement('div');
    post.className = "post-one";
    post.innerText = postText;
    postsContainer.appendChild(post);
  });

  return postsContainer;
}

export { renderPosts };
