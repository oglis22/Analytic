const express = require('express');
const router = express.Router();
const creds = require('./creds.json');
const datafetch = require('./datafetch');

router.get("/", (req, res) => {
    res.render('index');
});

router.post("/login", (req, res) => {

    const { username, password } = req.body;
    if (username == creds.username && password == creds.password) {
        res.cookie('secret', creds.secret);
        res.redirect("/panel");
    } else res.redirect("/error")

});

router.use("/", datafetch);

router.get("/error", (req, res) => {
    res.render('error');
});

router.get("/login", (req, res) => {
    if (isLoggedIn(req.cookies['secret'])) {
        res.redirect("/panel");
    } else res.render('login')
});

router.get("/logout", (req, res) => {
    res.clearCookie('secret');
    res.redirect('/');
});

function isLoggedIn(sec) {
    return (sec == creds.secret);
}

module.exports = router;
