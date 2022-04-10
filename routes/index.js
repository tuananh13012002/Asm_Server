var express = require('express');
var router = express.Router();
const app = express();
app.use(express.static("public"));
/* GET home page. */
var db = 'mongodb+srv://admin:tuananh0203@cluster0.f00xz.mongodb.net/mydata?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(db).catch(err => {
    console.log("Xảy ra lỗi :" + err);
})
router.get('/', function (req, res, next) {
    HinhNen.find({}, function (err, data) {
        res.render('index', {data: data});
    })
});
router.get("/add", function (req, res, next) {
    res.render("add", {title: 'add'});
});
router.post("/showdetail", function (req, res) {
    HinhNen.findById({_id: req.body.id}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render("showdetail", {data: data});
        }
    })
})
var hinhNenSchame = new mongoose.Schema({
    noiDung: 'string',
    ngayThang: 'string',
    linkAnh: 'string'
})
var HinhNen = mongoose.model('hinhnen', hinhNenSchame);
router.post('/add', function (req, res) {
    var noiDung = req.body.noiDung;
    var ngayThang = req.body.ngayThang;
    var linkAnh = req.body.linkAnh;
    const hinhNen = new HinhNen({
        noiDung: noiDung,
        ngayThang: ngayThang,
        linkAnh: linkAnh,
    })
    hinhNen.save(function (err) {
        if (err) {
            mes = "Thêm thành công"
        } else {
            mes = err
        }
        console.log(noiDung + ngayThang + linkAnh);
        res.render("add")
    })
})
router.post("/remove",function (req,res){
   HinhNen.deleteOne({_id:req.body.id})
       .then(result=>{
           res.redirect('/');
       })
       .catch(err=>console.log(err))
})
router.post('/update',function (req,res){
    HinhNen.findById({_id: req.body.id}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render("update", {data: data});
        }
    })
})
router.post('/updateHinhNen',function (req,res){
     HinhNen.updateOne({_id:req.body.id},req.body)
         .then(result=>{
             res.redirect('/');
         })
         .catch(err=>console.log(err))
})
router.get('/getAll', function (req, res) {
    HinhNen.find({}, function (err, data) {
        res.send(data)
    })
});
module.exports = router;
