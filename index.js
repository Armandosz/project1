const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');


//const indexRoute = require('./routes/index');

//setttings
//app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//  middlewares

//routes
app.use(require('./routes/index'));

//static  files
app.use(express.static(path.join(__dirname, 'public')));

//listening on seervere p ort
app.listen(app.get('PORT    '), () => {
    console.log(`Server on port: ${PORT}`);
})

//subir video
let storage =  multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './subidas')
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    console.log("this is the home page");
});

app.post('/subir',upload.single('file'), (req, res)=>{
    console.log(`Storage location is ${req.hostname}/${req.file.path}`);
    return res.send(req.file);
} );

app.listen(PORT, ()=> console.log(`Server is up on port: ${PORT}`));