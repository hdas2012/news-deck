import { API_BASE_URL } from "./Config";

export const getNewsApiUrl = (newsType, page) => {
  let partialUrl = newsType === "top" ? "search" : "search_by_date";
  return API_BASE_URL + "/" + partialUrl + "?page=" + page;
};

export const getNewsType = () => {
  let domain = window.location.hostname;
  let url = window.location.href;
  if (url.indexOf(domain + "/") >= 0) {
    let type = url.split(domain + "/")[1].split("/")[0];
    type = type.trim() === "" ? "top" : type;
    return type;
  } else {
    return "top";
  }
};

export const getHostFromUrl = url => {
  return url ? new URL(url).host.replace("www.", "") : "";
};

export const getLocalStorage = (key, defaultVal) => {
  let val = localStorage.getItem(key);
  if (!val) {
    return defaultVal;
  } else {
    return JSON.parse(val);
  }
};

export const removeItemFromArr = (arr, val) => {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const setLocalStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const timeSince = time => {
  var seconds = Math.floor((new Date() - new Date(time)) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};
