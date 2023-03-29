var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app = express();
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1/4db', function(err, db){
	var dbo = db.db("4db");        
	if(!err){
		console.log('Welcome');
	
	app.get('/',function(req,res){
		console.log("We are Connected");
		res.sendFile(__dirname+'/'+'exp6.html');
	})

	app.post('/emp_post',urlencodedParser, function(req, res){
        
		var emp_id = req.body.empid;
		var emp_name = req.body.name;
		var emp_dep = req.body.dep;
		var emp_des = req.body.des;
		var emp_mob = req.body.mob;
		var emp_email = req.body.email;
		dbo.collection('employee1').insertOne({'Emp_id':emp_id,'Name':emp_name,'Department':emp_dep,'Designation':emp_des,'Mobile':emp_mob,'Email':emp_email}, function(err,doc){
			if(err) throw err;
						console.log("1 docu inserted");    
					});      		
	
		console.log('Record Inserted');
res.send('<p>EMP_ID : '+emp_id+'</p><p>Name : '+emp_name+'</p><p>Department : '+emp_dep+'</p><p>Designation : '+emp_des+'</p><p>Mobile : '+emp_mob+'</p><p>E-Mail : '+emp_email+'</p>');


})

	var server =  app.listen(3002, function(){
	var port = server.address().port
	console.log('Employee app listening on port go to http://localhost:%s',port)
	})
	

	
app.get('/display', function(req, res) {
    dbo.collection('employee1').find().toArray(function(err,i){
        if (!err) {
            res.render('46.ejs', {employees:i});
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
 
});
	
app.get('/update_emp.html', function(req, res){
    res.sendFile(__dirname+'/'+'update_emp.html');
})

app.get('/update',function(req,res){
    var e_name = req.query.name;
    var e_des = req.query.des;
    dbo.collection('employee1').updateOne({"Name":e_name},{$set:{"Designation":e_des}},function(err,i){
        if(!err)
            res.send("Record Updated Successfully")
        else
            return res.send(err)
    })
})


app.get('/delete_mca',function(req,res){
    
    dbo.collection('employee1').deleteOne({"Department":"MCA"},function(err,i){
        if(!err)
            res.send("Record Deleted Successfully")
        else
            return res.send(err)
    })
})

	

}
	else
		db.close

})
