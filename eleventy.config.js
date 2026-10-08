module.exports = function (eleventyConfig) {
  // Copy these straight to the output folder
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/files");

  // {{ date | dateIso }} -> 2026-10-02   |   {{ date | dateReadable }} -> 2 Oct 2026
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("dateReadable", (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
    })
  );
  // Breadcrumb trail from a URL: /projects/foo/ -> yourname, projects, foo
  eleventyConfig.addFilter("breadcrumbs", (url, root) => {
    const crumbs = [{ label: root.toLowerCase().replace(/\s+/g, ""), url: "/" }];
    let path = "/";
    url.split("/").filter(Boolean).forEach((part) => {
      path += part + "/";
      crumbs.push({ label: part, url: path });
    });
    return crumbs;
  });
  // {{ list | limit(3) }} -> first 3 items
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
