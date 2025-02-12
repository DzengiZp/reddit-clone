export async function GetUsersFromDummyJson() {
  let users = localStorage.getItem("users");

  if (!users) {
    const response = await fetch('https://dummyjson.com/users?limit=5&skip=10&select=id,firstName,age');
    const data = await response.json();

    localStorage.setItem("users", JSON.stringify(data.users));
    return data.users;
  }

  return JSON.parse(users);
}

export async function GetCommentsFromDummyJson() {
  let comments = localStorage.getItem("comments");

  if (!comments) {
    const response = await fetch('https://dummyjson.com/comments?limit=5&skip=10&select=body,postId');
    const data = await response.json();

    comments = localStorage.setItem("comments", JSON.stringify(data.comments));
    return data.comments;
  }

  return JSON.parse(comments);
}

export async function GetPostsFromDummyJson() {
  let posts = localStorage.getItem("posts");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!posts) {
    const response = await fetch('https://dummyjson.com/posts?limit=4&skip=10&select=title,reactions,userId,body');
    const data = await response.json();

    const filteredPosts = data.posts.filter(post => users.some(user => user.id === post.userId));

    localStorage.setItem("posts", JSON.stringify(data.posts));
    return filteredPosts;
  }

  return JSON.parse(posts);
}