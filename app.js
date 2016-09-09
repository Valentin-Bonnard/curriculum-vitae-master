var http = require('http');
var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var ejs = require('ejs');

var app=express();
var port = process.env.Port || 8080;
/*------------------SMTP-----------------------------*/

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "valentinbonnard0303@gmail.com",
        pass: "valentin03031992"
    }
});
/*------------------SMTP-----------------------------*/

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({resave :true,
				saveUninitialized : true, 
				secret: 'paladin8'
			}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));


/*------------------Routing ------------------------*/

app.get('/',function(req,res){
	res.render('index');
});


	app.get('/send',function(req,res){

  element = req.body.subject;
  if(element == ''){

  		var mailOptions={
		to : "valentinbonnard0303@gmail.com",
		subject : req.query.subject,
		text :"Demande de : " + req.query.name +"  " +req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
});
}else {
  	console.log("Voues étes un bot!!!!!");
  	
  }
});


app.get('*', function(req, res){
  res.status(400);
  res.render('404', {title: 'Erreur 404'});
});


/*------------------Routing ------------------------*/

if('development' == app.get('env')){
	app.use(errorHandler());
}


var server = http.createServer(app);
server.listen(port, function(){
	console.log('Server listening on port : ' + port);
});



