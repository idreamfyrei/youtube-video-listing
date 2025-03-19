// const fetch = require('node-fetch');
const videoContainer = document.getElementById("video-container");
const videoSearch = document.getElementById("search");

//store the fetched videos
let videos = [];

const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
const options = { method: "GET", headers: { accept: "application/json" } };

//to fetch videos
async function getVideos() {
  try {
    const response = await fetch(url, options);
    const recData = await response.json();
     console.log(recData);

    //videos are in data.data
    videos = recData.data.data;
    console.log(videos);
    displayVideos(videos);
  } catch (error) {
    console.error("Error encountered while fetching videos:", error);
  }
}

//to display videos
function displayVideos(videos) {
  videoContainer.innerHTML = "";
  
  videos.forEach((video) => {
    const thumbnail = video.items.snippet.thumbnails.medium;
    const title = video.items.snippet.title;
    const channelTitle = video.items.snippet.channelTitle;

    //create video element
    const videoElement = document.createElement("div");
    videoElement.classList.add("video-element");
    videoElement.innerHTML = `
    <div class="video-card">
        <div class="thumbnail-wrapper">
            <a href="https://www.youtube.com/watch?v=${video.items.id}" target="_blank" title="${title}">
                <img src="${thumbnail.url}" alt="${title} Thumbnail" width="${thumbnail.width}">
            </a>
        </div>
        <div class="content-wrapper">
            <h4>${title}</h4>  <span>Channel: ${channelTitle}</span>
        </div>
    </div>`;
    videoContainer.appendChild(videoElement);
  });
}

//to filter videos
function filterVideos() {
  const searchVideo = videoSearch.value.trim().toLowerCase();
  const filteredVideos = videos.filter((video) =>
    //filter video by title
    video.items.snippet.title.toLowerCase().includes(searchVideo)
  );
  displayVideos(filteredVideos);
}


getVideos();
