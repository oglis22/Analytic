const express = require('express');
const router = express.Router();
const creds = require('./creds.json');
const fs = require('fs');

router.get("/panel", (req, res) => {
    const uc = getUserCount();
    const uj = getUserJoins();
    const ul = getUserLeaves();
    const uca = getUserCountAll();
    const umsgs = getUserMessageCount();
    const vcj = getUserVCallJoins();
    if (isLoggedIn(req.cookies['secret'])) {
        res.render("panel", { uc, uj, ul, uca, umsgs, vcj });
    } else {
        res.redirect("/error");
    }
});

router.get("/user_insights", (req, res) => {

    const uca = getUserCountAll();
    const umsgs = getUserMessageCount();
    const vcj = getUserVCallJoins();
    const tc = getTotalMessages();

    if (isLoggedIn(req.cookies['secret'])) {
        res.render("user_insights", { uca, umsgs, vcj, tc });
    } else {
        res.redirect("/error");
    }

});

function isLoggedIn(sec) {
    return (sec === creds.secret);
}

function getUserCount() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.UserCount;
}
function getUserJoins() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.Joins;
}
function getUserLeaves() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.Leaves;
}

function getUserCountAll() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.count;
}

function getUserMessageCount() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.messagesend;
}

function getUserVCallJoins() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.vcalljoins;
}

function getTotalMessages() {
    let rawdata = fs.readFileSync('./data/Messages.json');
    let messages = JSON.parse(rawdata);
    return messages.total_messages;
}


module.exports = router, {
    getUserCount
};
