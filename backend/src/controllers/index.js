const fs = require('fs');
import { readdirSync } from 'fs';
const { getVideoDurationInSeconds } = require('get-video-duration');

const ThroughDirectory = (path, channel) => {
  const retArray = [];
  const getFiles = (dirpath, resultArray) =>
    readdirSync(dirpath, { withFileTypes: true }).map((dirent) => {
      if (dirent.isDirectory()) {
        return getFiles(dirpath + '/' + dirent.name, retArray);
      } else {
        if (dirent.name.split('.')[0] === channel) {
          resultArray.push(dirpath + '/' + dirent.name);
        }
      }
    });
  getFiles(path, retArray);
  return retArray.flat();
};

module.exports = {
  async getChannels(req, res) {
    const type1 = req.query.type1 ? req.query.type1 : '';
    const getDirectories = (source) =>
      readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    return res.json({
      data: getDirectories('source/' + type1),
    });
  },

  async getAllMedias(req, res) {
    const type1 = req.query.type1 ? req.query.type1 : '';
    const type2 = req.query.type2 ? '/' + req.query.type2 : '';
    const channel = req.query.channel ? req.query.channel : '';
    const paths = ThroughDirectory(
      'source/' + type1 + type2,
      channel,
    );
    const data = await Promise.all(
      paths.map(async (path) => {
        if (path !== undefined) {
          const duration = await getVideoDurationInSeconds(path);
          return { duration: duration, path: path };
        }
      }),
    );
    return res.json({
      data: data,
    });
  },
  async getAllLogos(req, res) {
    // const type = req.query.type ? req.query.type : '';
    const channel = req.query.channel ? '/' + req.query.channel : '';
    const paths = ThroughDirectory('source/logodetection' + channel);
    // const data = await Promise.all(paths.map(async (path) => {
    //   const duration = await getVideoDurationInSeconds(path);
    //   return {duration: duration, path: path};
    // }))
    return res.json({
      data: paths,
    });
  },
  async getAllTexts(req, res) {
    // const type = req.query.type ? req.query.type : '';
    const channel = req.query.channel ? '/' + req.query.channel : '';
    const paths = ThroughDirectory('source/speechtotext' + channel);
    // const data = await Promise.all(paths.map(async (path) => {
    //   const duration = await getVideoDurationInSeconds(path);
    //   return {duration: duration, path: path};
    // }))
    return res.json({
      data: paths,
    });
  },
};
