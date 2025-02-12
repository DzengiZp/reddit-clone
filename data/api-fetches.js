export async function GetUsersFromDummyJson() {
  let users = localStorage.getItem("users");

  if (!users || JSON.parse(users).length === 0) {
    const response = await fetch('https://dummyjson.com/users?limit=10&select=id,firstName,age');
    const data = await response.json();

    localStorage.setItem("users", JSON.stringify(data.users));
    return data.users;
  }

  return JSON.parse(users);
}

export async function GetPostsFromDummyJson() {
  let posts = localStorage.getItem("posts");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!posts || JSON.parse(posts).length === 0) {
    const response = await fetch('https://dummyjson.com/posts?limit=200&select=title,reactions,userId,body');
    const data = await response.json();

    const userIds = users.map(user => user.id);
    const filteredPosts = data.posts.filter(post => userIds.includes(post.userId)).slice(0, 20);

    localStorage.setItem("posts", JSON.stringify(filteredPosts));
    return filteredPosts;
  }

  return JSON.parse(posts);
}


export async function GetCommentsFromDummyJson() {
  let comments = localStorage.getItem("comments");

  if (!comments || JSON.parse(comments).length === 0) {
    const response = await fetch('https://dummyjson.com/comments?limit=5&skip=10&select=body,postId');
    const data = await response.json();

    localStorage.setItem("comments", JSON.stringify(data.comments));
    return data.comments;
  }

  return JSON.parse(comments);
}