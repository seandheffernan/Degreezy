import express from "express";
import passport from "passport";
import cas from "passport-cas2";

let casStrategy = cas.Strategy;


passport.use(new casStrategy({
        casURL: "https://cas-auth.rpi.edu/cas",
    },
    function (username, profile, callback) {
        console.log(username);
    }));

let app = express();

app.use(passport.initialize());

app.get('/test', passport.authenticate('cas', {failureRedirect: '/login'}), function(req, res) {
    res.send("All done");
});

app.listen(3001, function() {
    console.log("App started on port 3001")
});
