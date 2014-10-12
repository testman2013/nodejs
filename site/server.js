var express = require('express');

var app = express();

//set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	//res.type('text/plain');
	//res.send('home page');
	res.render("home");
});

app.get('/about', function(req, res){
	var fortunes = [
	 "Conquer your fears or they will conquer you.",
	 "Rivers need springs.",
	 "Do not fear what you don't know.",
	 "You will have a pleasant surprise.",
	 "Whenever possible, keep it simple.",
	];
	var randomForture = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render("about", {fortune: randomForture});
});

// custom 404 page
app.use(function(req, res){
	//res.type('text/plain');
	res.status(404);
	res.render("404");
});

// custom 500 page
app.use(function(err, reg, res, next){
	console.error(err.stack);
	//res.type('text/plain');
	res.status(500);
	res.render("500");
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on port:' + app.get('port'));
});
