//The space where your profile information will appear
const overview = document.querySelector(".overview");
//My username
const username = "lindzo7";
//The unordered list that displays the repo list
const displayRepoList = document.querySelector(".repo-list");

const getInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`); 
    const data = await userInfo.json();
    displayInfo(data);
};
getInfo();


const displayInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure> <img alt="user avatar" src=${data.avatar_url} /> </figure>  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> ` 
   overview.append(div);
   getRepos();
};


 const getRepos = async function () {
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRepos.json();
    console.log(repoData);
    repoInfo(repoData);
};


const repoInfo = function (repos) {
    for(const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        displayRepoList.append(li);
    };
};  

