'use strict';
const { request } = require("@octokit/request")
const axios = require("axios")
const md = require('markdown-it')();
// const service = require("../services/index")
module.exports = ({ strapi }) => ({
  // getProjectForRepo: async (repo) => {
  //   const { id } = repo;
  //   const matchingProjects = await strapi.entityService.findMany("pulgin::github-projects.project", {
  //     filters: {
  //       repositoryId: id
  //     }
  //   });
  //   if (matchingProjects.length == 1) return matchingProjects[0].id;
  //   return null;
  // },
  // https://developer.github.com/v3/repos/#list-organization-repositories

  getPublicRepos: async () => {
    console.log("...............................................................................");
    console.log(process.env.GITHUB_TOKEN);
    const result = await request("GET /user/repos", {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    });
    return Promise.all(result.data.map(async (item) => {
      const { id, name, description, html_url, owner, default_branch } = item;
      // console.log(name)
      const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`
      console.log(readmeUrl)
      const longDescription = md.render(await axios.get(readmeUrl)
        // console.log(longDescription);  
        .then((response) => {
          console.log("inside then");
          console.log(response.data)
          return response.data.toString('utf16le')
        })
        .catch((err) => {
          console.log("inside catch");
          console.error(err)
        })).replaceAll("\n", "<br/>")
      //  return {// id,// name,// shortDescription: description,// url: html_url,//  longDescription// };
      const repo = { id, name, shortDescription: description, url: html_url, longDescription };
      const relatedProjectId = await strapi.plugin("github-projects")
      // .service("getReposService")
      //.getProjectForRepo(repo);
      return { ...repo, projectId: relatedProjectId, }
    }));
    // return result;
    console.log(`${result.data} repos found.`);
  }
});