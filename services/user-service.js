const { Video } = require("../models");

const populatePlaylist = async (videoIdArr) => {
  const playlist = await Promise.all(
    videoIdArr.map((videoId) => Video.findById(videoId))
  );

  return playlist;
};

module.exports = { populatePlaylist };
