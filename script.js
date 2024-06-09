 const APIURL = "https://api.github.com/users/";
const main = document.querySelector('#main');
const searchBox =document.querySelector("#search")


const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();

    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Profile Avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li><strong>${data.followers}</strong> Followers</li>
                    <li><strong>${data.following}</strong> Following</li>
                    <li><strong>${data.public_repos}</strong> Repos</li>
                </ul>

                <div id="repos">

                </div>
            </div>
        </div>
    `;

    main.innerHTML = card;
    getRepos(username);
};

const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url; // Use 'html_url' instead of 'url'
        elem.innerText = item.name;
        elem.target = "_blank";
        repos.appendChild(elem);
    });
};

const formsubmit =() =>{
    if(searchBox.value !=""){
        getUser(searchBox.value);
        searchBox.value =""
    }
    return false;
}

getUser("angelabauer");

searchBox.addEventListener(
    "focusout",
    function(){
        formsubmit()
    }
    )
