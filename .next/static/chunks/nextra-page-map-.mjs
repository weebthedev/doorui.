import meta from "../../../pages/_meta.js";
export const pageMap = [{
  data: meta
}, {
  name: "intro",
  route: "/intro",
  frontMatter: {
    "sidebarTitle": "Intro"
  }
}, {
  name: "u",
  route: "/u",
  children: [{
    name: "installation",
    route: "/u/installation",
    frontMatter: {
      "sidebarTitle": "Installation"
    }
  }]
}];