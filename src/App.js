import React, { Component } from "react";
import "./App.css";
let GITHUBAPI = "https://api.github.com/users/";
let DEFAULTURL = "https://api.github.com/users/osamakhalil98";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.defaultProfile = this.defaultProfile.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    if (this._inputElement.value !== "") {
      const res = await fetch(GITHUBAPI + this._inputElement.value);
      const resData = await res.json();
      if (resData.bio === null) {
        document.getElementById(
          "bio"
        ).innerHTML = `<em>This user has no bio!</em>`;
      } else {
        document.getElementById("bio").innerText = resData.bio;
      }
      if (resData.name === null) {
        document.getElementById("user-title").innerText = resData.login;
      } else {
        document.getElementById("user-title").innerText = resData.name;
      }
      document.getElementById("image").src = resData.avatar_url;
      document.getElementById(
        "followers"
      ).innerHTML = `<b>${resData.followers}</b> Followers`;
      document.getElementById(
        "following"
      ).innerHTML = `<b>${resData.following}</b> Following`;
      document.getElementById(
        "repos"
      ).innerHTML = `<b>${resData.public_repos}</b> Repos`;
      let reposNumber = resData.public_repos;
      console.log(reposNumber);
      if (reposNumber === 0) {
        let zeroReposList = document.querySelector(".zero-repos");
        zeroReposList.classList.add("active");
      } else {
        let zeroReposList = document.querySelector(".zero-repos");
        zeroReposList.classList.remove("active");
        let userRepos = await fetch(
          `${GITHUBAPI}${this._inputElement.value}/repos`
        );
        console.log(userRepos);
        try {
          let userReposData = await userRepos.json();
          let repoUrl = await fetch(
            `${GITHUBAPI}${this._inputElement.value}/repos`
          );
          let repoUrlData = await repoUrl.json();
          console.log(repoUrlData);
          repoUrlData.slice(0, 5).forEach((repo, idx) => {
            let link = document.getElementById(`repos-${idx}`);
            console.log(link);
            link.href = repo.html_url;
            link.style.color = "white";
            link.target = "_blank";
            link.style.textDecoration = "none";
          });
          userReposData.slice(0, 5).forEach((repo, idx) => {
            document.getElementById(`start-repos-${idx}`).innerText = repo.name;
          });
        } catch (ex) {
          window.location.reload();
          console.log(ex);
        }
      }

      return resData;
    }
  }
  async defaultProfile() {
    let res = await fetch(DEFAULTURL);
    let resData = await res.json();
    return resData;
  }
  async componentDidMount() {
    let osos = await this.defaultProfile();
    document.getElementById("image").src = osos.avatar_url;
    document.getElementById("user-title").innerText = osos.name;
    document.getElementById("bio").innerText = osos.bio;
    document.getElementById(
      "followers"
    ).innerHTML = `<b>${osos.followers}</b> Followers`;
    document.getElementById(
      "following"
    ).innerHTML = `<b>${osos.following}</b> Following`;
    document.getElementById(
      "repos"
    ).innerHTML = `<b>${osos.public_repos}</b> Repos`;
    let userRepos = await fetch(DEFAULTURL + "/" + "repos");
    let userReposData = await userRepos.json();
    userReposData.slice(0, 5).forEach((repo, idx) => {
      document.getElementById(`start-repos-${idx}`).innerText = repo.name;
    });
    let repoUrl = await fetch(`${DEFAULTURL}/repos`);
    let repoUrlData = await repoUrl.json();
    console.log(repoUrlData);
    repoUrlData
      .slice(0, 5)
      .sort((a, b) => b - a)
      .forEach((repo, idx) => {
        let link = document.getElementById(`repos-${idx}`);
        console.log(link);
        link.href = repo.html_url;
        link.style.color = "white";
        link.target = "_blank";
        link.style.textDecoration = "none";
      });
  }
  render() {
    return (
      <div>
        <div className="search-user">
          <form onSubmit={this.handleSubmit}>
            <input
              type="search"
              placeholder="Search a github user"
              id="search-bar"
              ref={(a) => (this._inputElement = a)}
            ></input>
          </form>
        </div>
        <div className="card-container">
          <div className="card-header">
            <div className="user-img-bio">
              <div className="user-img">
                <img id="image" src={this.defaultProfile.avatar_url}></img>
              </div>
              <div className="user-bio">
                <h2 id="user-title"></h2>
                <p id="bio"></p>
              </div>
            </div>
            <div className="user-stats">
              <ul>
                <li id="followers">
                  100<b> Followers</b>
                </li>
                <li id="following">
                  50<b> Following</b>
                </li>
                <li id="repos">
                  7<b> Repos</b>
                </li>
              </ul>
            </div>
            <div className="user-repos">
              <ul className="zero-repos">
                <a id="repos-0">
                  <li id="start-repos-0">Repo1</li>
                </a>
                <a id="repos-1">
                  <li id="start-repos-1">Repo1</li>
                </a>
                <a id="repos-2">
                  <li id="start-repos-2">Repo1</li>
                </a>
                <a id="repos-3">
                  <li id="start-repos-3">Repo1</li>
                </a>
                <a id="repos-4">
                  <li id="start-repos-4">Repo1</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
