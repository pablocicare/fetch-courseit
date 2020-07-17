let imageEl = document.querySelector(".js-user-avatar");
let nicknameEl = document.querySelector(".js-nickname");
let realnameEl = document.querySelector(".js-realname");
let locationEl = document.querySelector(".js-location");
let reposEl = document.querySelector(".js-repos");
let followersEl = document.querySelector(".js-followers");
let input = document.querySelector(".js-input-search");
let button = document.querySelector(".js-search-btn");
let card = document.querySelector(".js-user-card");
let notCard = document.querySelector(".js-not-found");
let notButton = document.querySelector(".js-clean-btn");
let catError = document.querySelector(".js-http-cat");

button.addEventListener("click", getGithubUser);

notButton.addEventListener("click", cleanGithubUser);

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    getGithubUser();
  }
});

card.style.display = "none";

function cleanGithubUser() {
  card.style.display = "none";
  notCard.style.display = "none";
};


async function getGithubUser () {
  try {
    card.style.display = "block"; 
    
    let username = input.value;
    
    let responseData = await fetch(`https://api.github.com/users/${username}`);
    
    const userData = await responseData.json();
    
    console.log(userData);
    
    input.value = null;
    
    nicknameEl.innerHTML = userData.login;

    nicknameEl.href = (userData.html_url);
    
    realnameEl.innerHTML = userData.name;
    
    locationEl.innerHTML = userData.location;
    
    reposEl.innerHTML = userData.public_repos;
    
    followersEl.innerHTML = userData.followers;
    
    imageEl.src = userData.avatar_url;
    
    showPicture();
    // notFound();
    
    if (userData.message === "Not Found") {
      catError.src = (`https://http.cat/${responseData.status}`);
      card.style.display = "none";
      notCard.style.display = "block";
    } else {
      card.style.display = "block";
      notCard.style.display = "none";
    }
    
  } catch(error) {
    console.log(error);
    notCard.style.display = "block";
  }
}

function showPicture() {
  imageEl.style.display = "block";
}