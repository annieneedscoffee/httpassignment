let http = require('http');
let port = process.env.PORT || 8000;
let count = 0;
let fs = require('fs');


let server = http.createServer(function(req, res) {

  if(req.method === "GET" && req.url === "/intro"){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to backend!');
  }else if(req.method === "GET" && req.url === "/pets"){
    let pets = [
       "Gucci",
       "Mgee",
       "Oliver",
       "Treasure",
       "Jasper",
       "Precious",
    ]
    let stringpets = JSON.stringify(pets);
    res.setHeader('Content-Type', 'application/json');
    res.end(stringpets);
  }else if(req.method === "GET" && req.url === "/getinfo"){
    res.setHeader('Content-Type', 'text/plain');
    fs.readFile("./static/info.txt", "utf8", function(err, data){
      if(err){
        throw err;
      }
      let stuff = data;
      res.end(stuff);
    } )

  }else if(req.method === "POST" && req.url === "/count"){
    count++;

    fs.writeFile("./static/storage.txt", count, (err) => {
      if(err){
        throw err;
      }

    })
  }else if(req.method === "GET" && req.url === "/getcount"){
    res.setHeader('Content-Type', 'text/plain');
    fs.readFile("./static/storage.txt", "utf8", function(err, data){
      if(err){
        throw err;
      }
      res.end(data);
    })
  }else if(req.method === "GET" && req.url === "/index"){
    res.setHeader('Content-Type', 'text/html');
    fs.readFile("./static/index.html", "utf8", function(err, data){
      if(err){
        throw err;
      }
        res.end(data);

    })

  }else if(req.method === "GET" && req.url === "/dynamic"){
    res.setHeader('Content-Type', 'text/html');
    fs.readFile("./static/storage.txt", "utf8", function(err, info){
      if(err){
        throw err;
      }
      console.log(info);


    fs.readFile("./dynamic/index.html", "utf8", function(err, data){
      if(err){
        throw err;
      }
        res.end(data+info);
    })
})
  }else {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Route not found');
  }

});

server.listen(port, function() {
  console.log('Listening on port', port);
});
