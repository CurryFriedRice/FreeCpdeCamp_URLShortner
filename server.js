require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser'); 
const dns         = require('dns');
var app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

var url = [String]; 
var num = 0;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(function middleware(req,res,next){
  console.log("I'm a middleware...");
  var resString ="Middleware Function | " + req.method + " | " + req.path + " | " + req.body.url;
  //console.log(resString); //NEEDS TO BE A STRING
  //console.log(res.body.url);
 
  console.log(resString);
  next();
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.route("/api/shorturl").get(function(req,res){
  var red = req.body.url;
  console.log("HONK HONK HONK");
  res.json({    
  });
});

app.get("/api/shorturl/:number?", function (req,res){
  console.log(url[req.params.number]);
  //console.log(num);
  //console.log(req.params.number);
  res.redirect(url[req.params.number]);
});

app.post("/api/shorturl",function(req,res){
  //console.log("POST HERE AT YOUR SERVICE!");
  //console.log("YA YA YA" + postStr);
  //if(!addr.contains("www."))addr = "www." + addr;
  var addr= req.body.url;
  //if(addr.contains("https://")) addr = addr.replace("https://", "");
  //else{res.json({error : "invalid url"});}
  dns.lookup(addr, function(err, addresses, family){
      console.log("DONK | " + addr + " | " + err + " | " + addresses + " | " + family);
      if(err === undefined || !addr.includes("https://")){res.json({error : "invalid url"});}
      else{
      url.push(req.body.url);
      num ++;
      res.json({
        original_url  : req.body.url,
        short_url     : num
      });
      }
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


 module.exports = app;
