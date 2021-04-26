const expressFunction = require('express');
const expressApp = expressFunction();
expressApp.use(expressFunction.json());

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv/config');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// var url = "mongodb+srv://petMeApp:0808317028@cluster0.9vrr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = process.env.PORT || 3000

expressApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
});

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });

expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(bodyParser.json())
 
// Set EJS as templating engine
expressApp.set("view engine", "ejs");


var multer = require('multer');

var storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'uploads')
},
filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
}
});

var upload = multer({ storage: storage });

var imgModel = require('./model');

expressApp.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

expressApp.post('/', upload.single('profile'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.send('tomtam');
        }
    });
});

expressApp.post("/api/get/login",function(req,res){
    const {
        Username,
        Password,
    } = req.body;

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("PetMeApp");
        dbo.collection("Pet").find().toArray(function(err, result) {
            res.send(result);
            db.close();
        });    
    }); 
});



expressApp.post("/api/get/profile",function(req,res){
    const username = req.body.username;
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("PetMeApp");
        console.log(req.body);
        dbo.collection("User").find({"username" : username}).toArray(function(err, result) {
            if(result[0].username === username){
                console.log(req.body);
                res.send({
                    name : result[0].name,
                    email : result[0].email,
                    mobileNumber : result[0].mobileNumber,
                    birth : result[0].birth,
                    address : result[0].address,
                    road : result[0].road,
                    subDistrict : result[0].subDistrict,
                    district : result[0].district,
                    province : result[0].province,
                    postalCode : result[0].postalCode

                });
                console.log(result[0]);
            }
            db.close();
        });      
    });  
});

expressApp.post("/api/add/registerUser",function(req,res) {
    const {
        username,
        password,
        name,
        email,
        mobileNumber,
        birth,
        address,
        road,
        subDistrict,
        district,
        province,
        postalCode
    } = req.body;

    console.log(req.body);
    if(username.lenght <= 2){
        res.status(400).send("Error");
    }
    else{
        const user = {
            "username" : username, 
            "password" : password,
            "name": name,
            "email" : email,
            "mobileNumber" : mobileNumber,
            "birth" : birth,
            "address" : address,
            "road" : road,
            "subDistrict": subDistrict,
            "district": district,
            "province": province,
            "postalCode": postalCode,
            "favorites" : 0,
            'status' : 'Null',
            "listPetId" : []
        }
        
        res.send(user);
        console.log(username);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("PetMeApp");
            dbo.collection("User").insertOne(user, function(err, res) {
              if (err) throw err;
              console.log("Add one people");
              db.close();
            });
        });
    }
});

expressApp.post("/api/add/registerPet",function(req,res) {
    const {
        petId,
        dogBreed,
        gender,
        age,
        petDetail,
        cost,
        nameAccountPromtpay,
        detailAccountPromtpay,
        question1,
        question2,
        question3,
        sellerUser,
    } = req.body;

    console.log(req.body);
    if(req.body.lenght <= 2){
        res.status(400).send("Error");
    }
    else{
        const pet = {
            "petId" : petId,
            "dogBreed" : dogBreed,
            "gender" : gender,
            "age" : age,
            "detail" : petDetail,
            "cost" : cost,
            "nameAccountPromtpay" : nameAccountPromtpay,
            "detailAccountPromtpay" : detailAccountPromtpay,
            "question1" : question1,
            "question2" : question2,
            "question3" : question3,
            "sellerUser" : sellerUser,
            "listPeople" : [{
                username:"tomtam",
                question1:"i like this",
                question2:"i like this",
                question3:"i like this"
            },{
                username:"tomtam",
                question1:"i like this",
                question2:"i like this",
                question3:"i like this"
            }],
            "sellStatus": true
        }
        
        console.log(user);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("PetMeApp");
            dbo.collection("Pet").insertOne(pet, function(err, res) {
              if (err) throw err;
              console.log("Add one pet");
              db.close();
            });
        });
    }
});

expressApp.post("/api/add/contact",function(req,res) {
    const {
        name,
        email,
        mobileNumber,
        topic,
        message
    } = req.body;

    console.log(req.body);
    if(name.lenght <= 2){
        res.status(400).send("Error");
    }
    else{
        const user = {
            "name" : name,
            "email" : email,
            "mobileNumber" : mobileNumber,
            "topic" : topic,
            "message" : message
        }
        res.send(user);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Admin");
            dbo.collection("Contact").insertOne(user, function(err, res) {
              if (err) throw err;
              console.log("Add one people");
              db.close();
            });
        });
    }
});

expressApp.post("/api/add/report",function(req,res) {
    const {
        name,
        email,
        mobileNumber,
        topic,
        message
    } = req.body;

    console.log(req.body);
    if(name.lenght <= 2){
        res.status(400).send("Error");
    }
    else{
        const user = {
            "name" : name,
            "email" : email,
            "mobileNumber" : mobileNumber,
            "topic" : topic,
            "message" : message
        }
        res.send(user);
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("Admin");
            dbo.collection("Report").insertOne(user, function(err, res) {
              console.log("Add one people");
              db.close();
            });
        });
    }
});

expressApp.post("/api/get/dataPet",function(req,res) {
    var data = [];
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("PetMeApp");
        dbo.collection("Pet").find().toArray(function(err, result) {
            for(var i=0;i<result.length;i++){
                data.push({
                    petId : result[i].petId,
                    cost : result[i].cost,
                    dogBreed : result[i].dogBreed,
                    sellerUser : result[i].sellerUser,
                });
            }
            res.send(data);
            db.close();
        });    
    });
    
});

expressApp.post("/api/get/checkPayment",function(req,res) {
    var data = [];
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("Admin");
        dbo.collection("Pament").find().toArray(function(err, result) {
            for(var i=0;i<result.length;i++){
                data.push({
                    petId : result[i].petId,
                    cost : result[i].cost,
                    dogBreed : result[i].dogBreed,
                    customerUser : result[i].customerUser,
                    sellerUser : result[i].sellerUser,
                    statusCheck : false,
                    nameAccountPromtpay : result[i].nameAccountPromtpay,

                });
            }
            res.send(data); 
            db.close();
        });    
    });
    
});



expressApp.put("/api/update",function(req,res) {
    const {
        username,
        name,
        email,
        mobileNumber,
        birth,
        address,
        road,
        subDistrict,
        district,
        province,
        postalCode
    } = req.body;
    console.log(req.body);

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("PetMeApp");
        var query = { 'Username' : username};
        var updateName = {$set : {
            "name":name,
            "email" : email,
            "mobileNumber" : mobileNumber,
            "birth" : birth,
            "address" : address,
            "road" : road,
            "subDistrict" : subDistrict,
            "district" : district,
            "province" : province,
            "postalCode" :postalCode
        }};
        dbo.collection("User").updateOne(query,updateName,function(err, res) {
            console.log("1 document updated");
            db.close();
        });
        res.send("Update " + username +" complete ");
    });
});

expressApp.listen(port,function(){
    console.log("Listen 4000");
});