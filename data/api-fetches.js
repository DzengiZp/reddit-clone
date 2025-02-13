export async function GetUsersFromDummyJson() {
  let users = localStorage.getItem("users");

  if (!users) {
    const response = await fetch('https://dummyjson.com/users?limit=0&select=id,firstName,age');
    const data = await response.json();

    localStorage.setItem("users", JSON.stringify(data.users));
    return data.users;
  }

  return JSON.parse(users);
}

export async function GetPostsFromDummyJson() {
  let posts = localStorage.getItem("posts");

  if (!posts) {
    const response = await fetch('https://dummyjson.com/posts?limit=200&select=title,reactions,userId,body,tags');
    const data = await response.json();

    const filteredPosts = data.posts.slice(0, 20);

    localStorage.setItem("posts", JSON.stringify(filteredPosts));
    return filteredPosts;
  }

  return JSON.parse(posts);
}

export async function GetCommentsFromDummyJson() {
  let comments = localStorage.getItem("comments");

  if (!comments) {
    const response = await fetch('https://dummyjson.com/comments?limit=0&select=body,postId,user');
    const data = await response.json();

    const formattedComments = data.comments.map(comment => ({
      id: comment.id,
      postId: comment.postId,
      username: comment.user?.username || "Unknown",
      text: comment.body
    }));

    localStorage.setItem("comments", JSON.stringify(formattedComments));
    return formattedComments;
  }

  return JSON.parse(comments);
}