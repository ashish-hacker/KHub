const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    console.log("In serializer");
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
            clientID: process.env.GO_CL_ID,
            clientSecret: process.env.GO_CL_SE,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("In strategy");
            let existingUser = null;
            try {
                existingUser = await User.findOne({
                    googleId: profile.id,
                });
            } catch (error) {
                console.log("error while connecting finding user", error);
                return;
            }

            if (existingUser) {
                //already user exist
                return done(null, existingUser);
            } else {
                //adding user to database
                const user = await new User({
                    googleId: profile.id
                }).save();

                done(null, user);
            }
        }
    )
);