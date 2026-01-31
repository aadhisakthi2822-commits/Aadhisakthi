/* -------- DEFAULT POSTS -------- */
const defaultPosts = [
  {
    id: 1,
    user: "Preethi",
    content: "Learning async JavaScript 🚀",
    reactions: { likes: 12 },
    comments: []
  },
  {
    id: 2,
    user: "Arun",
    content: "map filter reduce are awesome",
    reactions: { likes: 6 },
    comments: []
  }
];

/* -------- LOAD / SAVE -------- */
let posts = JSON.parse(localStorage.getItem("posts")) || defaultPosts;

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

/* -------- EVENTS -------- */
document.getElementById("loadBtn").addEventListener("click", renderPosts);
document.getElementById("exportBtn").addEventListener("click", exportJSON);

/* -------- RENDER POSTS -------- */
function renderPosts() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    feed.innerHTML += `
      <div class="card">
        <h3>${post.user}</h3>
        <p>${post.content}</p>

        <div class="stats">
          ❤️ Likes: ${post.reactions.likes} |
          💬 Comments: ${post.comments.length}
        </div>

        <button onclick="likePost(${post.id})">Like</button>

        <h4>Comments</h4>
        ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}

        <input type="text" id="comment-${post.id}" placeholder="Add a comment">
        <button onclick="addComment(${post.id})">Post Comment</button>
      </div>
    `;
  });
}

/* -------- LIKE COUNTER -------- */
function likePost(id) {
  const post = posts.find(p => p.id === id);
  post.reactions.likes++;
  savePosts();
  renderPosts();
}

/* -------- COMMENT + COUNTER -------- */
function addComment(postId) {
  const input = document.getElementById(`comment-${postId}`);
  const text = input.value.trim();

  if (!text) {
    alert("Comment cannot be empty");
    return;
  }

  const post = posts.find(p => p.id === postId);
  post.comments.push(text);

  savePosts();
  renderPosts();
}

/* -------- EXPORT JSON -------- */
function exportJSON() {
  const data = JSON.stringify(posts, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "social-feed.json";
  a.click();

  URL.revokeObjectURL(url);
}