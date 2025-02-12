export async function GetUsersFromDummyJson() {
  let users = localStorage.getItem("users");

  if (!users) {
    const response = await fetch('https://dummyjson.com/users?limit=5&skip=10&select=firstName,age');
    const data = await response.json();

    users = localStorage.setItem("users", JSON.stringify(data));
    return data;
  }

  return JSON.parse(users);
}

export async function GetCommentsFromDummyJson() {
  let comments = localStorage.getItem("comments");

  if (!comments) {
    const response = await fetch('https://dummyjson.com/comments?limit=5&skip=10&select=body,postId');
    const data = await response.json();

    comments = localStorage.setItem("comments", JSON.stringify(data));
    return data;
  }

  return JSON.parse(comments);
}

export async function GetPostsFromDummyJson() {
  let posts = localStorage.getItem("posts");

  if (!posts) {
    const response = await fetch('https://dummyjson.com/posts?limit=5&skip=10&select=title,reactions,userId');
    const data = await response.json();

    posts = localStorage.setItem("posts", JSON.stringify(data));
    return data;
  }

  return JSON.parse(posts);
}