/**
* @description Module and archives used by the server
* @author Adrián Sánchez <sesamaua@gmail.com>
*/

var template_engine = 'dust';

var express = require('express'),
    winston = require('winston'),
    cronJob = require('cron').CronJob,
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
	nodemailer = require('nodemailer');
 
var app = express();

var transporter  = nodemailer.createTransport({
   service: 'Gmail',  // sets automatically host, port and connection security settings
   auth: {
       user: 'adriansanchez.logn@gmail.com',
       pass: '09aDmAsAsE01'
   },
   tls: {
       rejectUnauthorized: false
   }
});
 
//app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(bodyParser());
    //app.use('/public', express.static(__dirname + '/eshopper/app'));
    //app.use('/admin', express.static(__dirname + '/admin/app'));
    app.use(express.static(__dirname + '/app'));
//});
/*
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
} catch(e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}
paypal.init(config);*/

if ( template_engine == 'dust' ) {
    var dust = require('dustjs-linkedin'),
        cons = require('consolidate');
    app.engine('dust', cons.dust);
} 


/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6*/
new cronJob('0 0 9 * * *', function(){
        //mail.sendAuto();
        console.log('Birthday Job runned');
    }, null, true, null);


var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports.logger = logger;


// ------------------------------------------------
// description Insert a new image
// author Adrián Sánchez <adriansanchez.logn@gmail.com>
// param submit form
// http://localhost:9000/category/ + JSON
/*app.post('/paypal/', paypal.makePayment);
app.get('/orderExecute', paypal.orderExecute);
*/
app.post('/email', function (req, res) {
    var mailOptions = {
		to: 'asanchez@technergycr.com', // receiver
		 subject: 'Hardwarethon: Desde la pagina web', // subject
		 text: 'Correo: ' + req.body['email'] + '. \n'+ 'Nombre: ' + req.body['name']// body
    };
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
	console.log(req.body);
});

//app.post('/email/', mail.sendPass);



app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');
