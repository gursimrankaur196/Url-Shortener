var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert =require('assert');
var http = require("http");
var url = 'mongodb://localhost:27017/urls';
var getUrl = require('url');
var decoded='';
var item;
/* GET home page. */
var arr ='123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Url-Shortener' });
});
// router.get('/get-data',function(req,res,next){
// var resultArray = [];
// mongo.connect(url,function(err,db){
// 	assert.equal(null,err);
// 	var cursor=db.collection('user').find();


// 	cursor.forEach(function(doc, err){
// 	assert.equal(null, err);
// 	resultArray.push(doc);
// 	}, function()
// {
// db.close();
// res.render('index', { items: resultArray });
// });
// });
// });

router.get('/*',function(req,res){
	number58=getUrl.parse(req.url).pathname.slice(1);
	console.log(number58);
	var k=0;
	var s=0;
	var base=58;
	while(number58)
	{ var index = arr.indexOf(number58[0]);
    var power = number58.length - 1;
    s += index * (Math.pow(base, power));
   // console.log(s);
    number58 = number58.substring(1);
}
console.log(s);
	mongo.connect(url,function(err,db){
	assert.equal(null,err);
	db.collection('urls').findOne({num10: s},function(err,doc){
          	if(doc)
        {  //number10=doc.num10;
      		long_url=doc.url1;
      		console.log(doc.url1);
      	      		db.close();
      	      			res.redirect(doc.url1);


          }
          else
          {
          	res.redirect('/');
          }
});
});
});
router.post('/insert',function(req,res,next){
	var long_url=req.body.url1;
	var newUrl="";
	var final="";
	var count1;
	var flag=0;
	var rand=Math.floor((Math.random() * 10000000000) + 1); 
	mongo.connect(url,function(err,db){
	assert.equal(null,err);
	db.collection("urls").count({}, function(err, count){
            if(err)
            	console.log(err.message);
            //db.close();
            while(true)
            {
            	db.collection('urls').findOne({num10: rand},function(err,doc){
          	if(doc)
          	{
          		rand=Math.floor((Math.random() * 10000000000) + 1); 
          		flag=1;
          	}
          	else flag=0;
          });
          	if(flag==1)
          		continue;
          	else 
          		break;
            }
        
           db.collection('urls').findOne({url1: long_url},function(err,doc){
          	if(doc)
        {  number10=doc.num10;
      		long_url=doc.url1;
      		var n=number10;
            	var base=58;
            	console.log(n);
            	while(n)
            	{
            		rem=n%base;
            		n=Math.floor(n/58);
            		console.log(n);
            		final=""+arr[rem]+final;
            	}

            	newUrl="0.0.0.0:3000/"+final;
            	console.log(newUrl);
      		//console.log(doc.num58);
      		db.close();
      		res.render('index', { items: newUrl });

          }
          
            // if(db.collection('user').find({"url1" : "abc"})!=null)
            // {
            // 	console.log(db.collection('user').find({"url1": "abc"},{ num10:1}))
            // }
            
            
            // // }
               else
            {
            	//console.log(db.user.find({}, {url1: "abc", _id: 0}).pretty());
            count1=count+1;
            console.log(count1);

            	var n=rand;
            	var base=58;
            	console.log(n);
            	while(n)
            	{
            		rem=n%base;
            		n=Math.floor(n/58);
            		console.log(n);
            		final=""+arr[rem]+final;
            	}

            	newUrl="0.0.0.0:3000/"+final;
            	console.log(newUrl);

            	// decoded='';
            	// decoded=newUrl.slice(19);
            //	console.log(decoded);
           
       		 

          item = {
		num10 : rand,
		url1 : req.body.url1,
	             };
       
	
	// mongo.connect(url,function(err,db){
	// assert.equal(null,err);
	db.collection('urls').insertOne(item, function(err, result){
	assert.equal(null, err);
	console.log("url inserted");
	
	// console.log(db.collection('user').find({
	// 	"num10" : "8"
	// }));
    });
	db.close();
	res.render('index', { items : newUrl});
	};
	});

	//db.close();
	});

});
	
});
function decode(num58)
{ var k=0;
	while(num58)
	{r=num58%10;
	num58=num58/10;
	s=s+r*Math.pow(58,k++);
}
return s;
}
// console.log(decoded); not working

// router.post('/{{{decoded}}}',function(req,res,next){

// }
// );
router.post('/update',function(req,res,next){
	
});
router.post('/delete',function(req,res,next){
	
});
module.exports = router;
