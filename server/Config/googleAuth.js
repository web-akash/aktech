const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("../models/userModel"); // Assuming userModel contains your User model

passport.serializeUser((user, done) => {
  // Serialize the user by saving only the user's id to the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id); // Find the user by their id
    done(null, user); // Return the user object to be stored in req.user
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "610476671662-7bai1s5glevptemsre54bufreb4qvtdp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = new userModel({
            googleId: profile.id,
            username: profile.displayName,
          });
          await newUser.save();
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
