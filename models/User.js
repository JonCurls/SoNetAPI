const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Would you kindly enter a username.",
      trim: true,
    },
    email: {
      type: String,
      required: "Would you kindly enter an email address.",
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// creates the user model using the UserSchema
const User = model("User", UserSchema);

//virtual to count the friends array
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;
