require('../global');
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.Promise = global.Promise;

class Db {
  constructor(props) {
    this.props = props;
    this.schemas = null;
    this.connection = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection = mongoose.createConnection(
        this.props.url,
        this.props.options,
        (error) => {
          if (error) {
            reject(error);
          } else {
            this.connection.once('open', () => {
              resolve(this.connection);
            });
          }
        }
      );
    });
  }

  loadSchema() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.props.schemaDir, (aErr, files) => {
        if (aErr) {
          reject(aErr);
        } else {
          // set all Models
          for (let i = 0, mName, il = files.length; i < il; i++) {
            mName = Db.fileNameToModelName(files[i]);
            if (this.schemas === null) {
              this.schemas = [];
            }
            // custom schema for Item
            // if (mName === 'Items') {
            //   const iSchema = new mongoose.Schema(require(`${this.props.schemaDir}/${mName.toLowerCase()}`))
            //   iSchema.index({ "domain": 1, "item_id": 1 }, { "unique": true });
            //   // mName.toLowerCase()
            //   this.schemas.push({
            //     modelName: mName,
            //     model: this.connection.model(
            //       mName,
            //       // eslint-disable-next-line
            //       iSchema,
            //       mName.toLowerCase()
            //     ),
            //   });
            // } else {
            this.schemas.push({
              modelName: mName,
              model: this.connection.model(
                mName,
                // eslint-disable-next-line
                new mongoose.Schema(require(`${this.props.schemaDir}/${mName.toLowerCase()}`)),
                mName.toLowerCase()
              ),
            });
            // }
          }
          resolve(this.schemas);
        }
      });
    });
  }

  static fileNameToModelName(fName) {
    const tmp = fName.split('.')[0].split('');
    tmp[0] = tmp[0].toUpperCase();
    return tmp.join('');
  }

  getModel(modelName) {
    const schema = this.schemas.find(o => o.modelName === modelName);
    return (
      schema === undefined ? new Error(`${modelName} schema not loaded`) : schema.model
    );
  }

}

module.exports = Db;
module.exports.create = (props) => {
  const database = new Db(props);
  global.appObjectStore.db.push({ name: props.name, db: database });
  return database;
};