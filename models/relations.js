let role = require("./role.model");
let user = require("./user.model");
let notification = require("./notfication.model");
let animals = require("./animals.model");
let insemination = require("./insemination.model");
let MedicalCondition = require("./MedicalCondition.model");
let productivity = require("./productivity.model");
let protectvaccines = require("./protectvaccines.model");
role.hasMany(user, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});
user.belongsTo(role);

user.hasMany(notification, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});
notification.belongsTo(user);

animals.hasMany(insemination, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});
insemination.belongsTo(animals);

animals.hasMany(MedicalCondition, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});
MedicalCondition.belongsTo(animals);

animals.hasMany(productivity, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});
productivity.belongsTo(animals);
