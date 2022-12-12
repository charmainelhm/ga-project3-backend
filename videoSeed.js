const { Video } = require("./models");
const axios = require("axios");

const performSeed = async () => {
  const res = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=rating&q=cute%20puppies&type=video&videoDuration=short&videoEmbeddable=true&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = res.data.items;
  const videoData = data.map((video) => {
    return {
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
      youtubeId: video.id.videoId,
      creator: video.snippet.channelTitle,
    };
  });

  console.log(videoData);
  //   const createdVideos = await Video.insertMany(videoData);
  //   console.log(`Created ${createdVideos.length} videos`);
  //   console.log(createdVideos);
};

performSeed();
