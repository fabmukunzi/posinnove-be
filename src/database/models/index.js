import fs from 'fs';
import path from 'path';
import associateModels from './associateModels';

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file.endsWith('.model.js')
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    models[model.name] = model;
  });

associateModels(models);

module.exports = models;
