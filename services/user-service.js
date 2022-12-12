const { Video, User } = require("../models");

const populatePlaylist = async (videoIdArr) => {
  const playlist = await Promise.all(
    videoIdArr.map((videoId) => Video.findById(videoId))
  );

  return playlist;
};

const updateUserPlaylist = async (videoId) => {
  await User.updateMany(
    {},
    {
      $pull: { playlist: videoId },
    }
  );
};

module.exports = { populatePlaylist, updateUserPlaylist };
