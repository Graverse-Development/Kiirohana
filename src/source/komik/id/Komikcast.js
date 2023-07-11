import cheerio from "cheerio";
import fetch from "./../../../utils/fetch";
async function getUpdate(page) {
  let url;
  if (!page || page === 1) {
    url = "https://komikcast.io/daftar-komik/?sortby=update";
  } else {
    url = `https://komikcast.io/daftar-komik/page/${page}/?sortby=update`;
  }

  return fetch(url).then((res) => {
    const $ = cheerio.load(res);
    const cont = $(".list-update_items > .list-update_items-wrapper").last();
    return $(cont)
      .find(".list-update_item")
      .map((i, card) => {
        const img = $(card).find("img").attr("src");
        let url = $(card).find("a").attr("href");
        url = url.replace("https://komikcast.io/komik/", "");
        return {
          title: $(card).find("h3").text(),
          cover: img,
          url: url,
        };
      })
      .get();
  });
}

async function getKomik(url) {
  if (!url.startsWith("https://komikcast.io/komik/"))
    url = "https://komikcast.io/komik/" + url;
  return fetch(url).then(async (res) => {
    const $ = cheerio.load(res);
    let title = await $(".komik_info-content-body-title")
      .text()
      .replace(/\s+/g, " ")
      .trim();
    let alternative = await $(".komik_info-content-native").text();
    let genres = await $(".komik_info-content-genre a")
      .map(function () {
        return $(this).text();
      })
      .get();
    let cover = await $(".komik_info-cover-image img").attr("src");
    let chapters = await $(".komik_info-chapters-item")
      .map(function () {
        return {
          title: $(this)
            .find(".chapter-link-item")
            .text()
            .replace(/\s+/g, " ")
            .trim(),
          url: $(this)
            .find(".chapter-link-item")
            .attr("href")
            .replace("https://komikcast.io/chapter/", ""),
        };
      })
      .get();
    let synopsis = $(".komik_info-description-sinopsis")
      .text()
      .replace(/\s+/g, " ")
      .trim();
    return {
      title: title,
      alternative_title: alternative,
      cover: cover,
      synopsis: synopsis,
      author: [],
      genres: genres,
      chapters: chapters,
      status: 0,
    };
  });
}

async function getChapter(url) {
  if (!url.startsWith("https://komikcast.io/komik/"))
    url = "https://komikcast.io/chapter/" + url;
  return fetch(url).then(async (res) => {
    console.log(res);
    const $ = cheerio.load(res);
    let pages = await $(".main-reading-area img")
      .map(function () {
        return $(this).attr("src");
      })
      .get();
    return {
      pages: pages,
    };
  });
}

const module = {
  config: {
    name: "Komikcast",
    type: "komik",
    id: "komikcastid",
    lang: "Indonesia",
    icon: "https://cdn.discordapp.com/attachments/847678573040631818/1094276277193670756/images.png",
  },
  search: [
    { name: "Judul", type: "string", min: 0, max: null },
    {
      name: "Genre",
      type: "filter",
      choices: [{ name: "Gender Bender", value: "gender%20bender" }],
    },
  ],
  getUpdate: getUpdate,
  getKomik: getKomik,
  getChapter: getChapter,
};

export default module;
