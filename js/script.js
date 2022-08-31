//The space where your profile information will appear
const overview = document.querySelector(".overview");
//My username
const username = "lindzo7";
//The unordered list that displays the repo list
const repoList = document.querySelector(".repo-list");
//Where all the repo information appears 
const displayRepoInfo = document.querySelector(".repos");
//Where all the individual repo data appears
const selectSingleRepoData = document.querySelector(".repo-data");  

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
        repoList.append(li);
    };
};  

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        singleRepoInfo(repoName);
    }
});

const singleRepoInfo = async function (repoName) {
    const oneRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await oneRepo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
for (const lang in languageData) {
    languages.push(lang);
    console.log(languages);
    }
 
displaySingleRepoData(repoInfo, languages);    
};

const displaySingleRepoData = function (repoInfo, languages) {
    selectSingleRepoData.innerHTML = "";
    selectSingleRepoData.classList.remove("hide");
    displayRepoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    selectSingleRepoData.append(div);
    
};



