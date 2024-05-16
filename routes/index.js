var express = require('express');
var router = express.Router();
var fs = require('fs');
const { parse, isSameDay, isBefore } = require("date-fns");
const { Console } = require('console');
const { post } = require('jquery');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rawdata = fs.readFileSync('./database/posts.json');

  let data = JSON.parse(rawdata).sort(function (a, b) {
    let dateOne = parse(a.created_at, 'yyyy-MM-dd', new Date())

    let dateTwo = parse(b.created_at, 'yyyy-MM-dd', new Date());

    if (isSameDay(dateOne, dateTwo)) {
      return 0;
    }

    if (isBefore(dateOne, dateTwo)) {
      return 1;
    }

    return -1;
  });

  // let categoryPosts = Array.from(new Set(data.map((post) => post.slug).sort()));
  // let categoryPosts = data.map(function(post){
  //   let [slug] = post.slug;
  //   let [cat] = post.category
  // })
  // console.log(categoryPosts)

  
  let navigationLinks = Array.from(new Set(data.map((post) => post.category).sort()));
  
  let categoryFilteredPosts = {};
  // navigationLinks.forEach(category =>{
  //   categoryFilteredPosts[category] = data.filter(post => post.category === category);
  // })

  data.forEach(post => {
    const category = post.category;
    if(!categoryFilteredPosts[category]){
      categoryFilteredPosts[category] = [];
    }
    categoryFilteredPosts[category].push(post);
  })
  console.log(categoryFilteredPosts)

  // let category = data.map((post) => post.category).sort());

  let dates = data.map(function(post) {
    let [year, month] = post.created_at.split('-');
    return new Date(`${year}-${month}-01`);
  });

  // let category = data.filter((post) => post.category)

  res.render('index', {
    title: 'She Code Queens',
    links: navigationLinks,
    posts: data.filter((post) => ! post.is_featured),
    featuredPosts: data.filter((post) => post.is_featured),
    archives: Array.from(new Set(dates)),
    categories: categoryFilteredPosts
    // categories: data.filter((post) => post.slug),
    // categories: categoryPosts,
  });

});

module.exports = router;
