// 1. Skapa ett huvud-container div
const container = document.createElement("div"); // <div></div>
container.id = "container"; // <div id="container"></div>

// 2. Skapa en rubrik <h1>
const title = document.createElement("h1"); // <h1></h1>
title.innerText = "Reddit-klon"; // <h1>Reddit-klon</h1>

// 3. Skapa en knapp för att lägga till inlägg
const addPostBtn = document.createElement("button"); // <button></button>
addPostBtn.innerText = "Lägg till inlägg"; // <button>Lägg till inlägg</button>
addPostBtn.id = "addPostBtn"; // <button id="addPostBtn">Lägg till inlägg</button>

// 4. Skapa en div där alla inlägg ska visas
const postsDiv = document.createElement("div"); // <div></div>
postsDiv.id = "posts"; // <div id="posts"></div>

// 5. Lägg in alla element i `container`
container.appendChild(title);
container.appendChild(addPostBtn);
container.appendChild(postsDiv);

// 6. Lägg in `container` i `body`
document.body.appendChild(container);

// Funktion för att skapa ett nytt inlägg
function createPost(titconstext, contentText) {
  // 1. Skapa ett inlägg (div)
  const postDiv = document.createElement("div");
  postDiv.className = "post"; // <div class="post"></div>

  // 2. Skapa titel (h2)
  const postTitle = document.createElement("h2");
  postTitle.innerText = titconstext; // <h2>Titel</h2>

  // 3. Skapa innehåll (p) och begränsa till 60 tecken
  const postContent = document.createElement("p");
  postContent.innerText = contentText.length > 60
    ? contentText.substring(0, 60) + "..."
    : contentText; // <p>Text...</p>

  // 4. Lägg in titel och innehåll i post-diven
  postDiv.appendChild(postTitle);
  postDiv.appendChild(postContent);

  // 5. Lägg in inlägget i `#posts`
  postsDiv.appendChild(postDiv);
}

// Lägg till event på knappen
addPostBtn.addEventListener("click", () => {
  createPost("Mitt nya inlägg", "Det här är ett testinlägg som jag skapade dynamiskt!");
});

console.log(document.body.innerHTML);
