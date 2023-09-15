import { DataTypes, Model, Sequelize } from "sequelize";

// Helper function
const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

export const sequelize = new Sequelize(process.env.DATABASE_URL);

class Image extends Model {}
Image.init(
  {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  { sequelize, timestamps: false, modelName: "image" }
);

class Video extends Model {}
Video.init(
  {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
  },
  { sequelize, timestamps: false, modelName: "video" }
);

class Comment extends Model {
  declare commentableType: string;

  getCommentable(options) {
    if (!this.commentableType) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
    return this[mixinMethodName](options);
  }
}
Comment.init(
  {
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
  },
  { sequelize, timestamps: false, modelName: "comment" }
);

Image.hasMany(Comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "image",
  },
});
Comment.belongsTo(Image, { foreignKey: "commentableId", constraints: false });

Video.hasMany(Comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "video",
  },
});
Comment.belongsTo(Video, { foreignKey: "commentableId", constraints: false });

Comment.addHook("afterFind", (findResult) => {
  if (!Array.isArray(findResult))
    findResult = [findResult as Model<unknown, unknown>];
  for (const instance of findResult) {
    if (instance.commentableType === "image" && instance.image !== undefined) {
      instance.commentable = instance.image;
      delete instance.video;
      delete instance.dataValues?.video;
    } else if (
      instance.commentableType === "video" &&
      instance.video !== undefined
    ) {
      instance.commentable = instance.video;
      delete instance.image;
      delete instance.dataValues?.image;
    }
  }
});
