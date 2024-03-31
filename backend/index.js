const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors())
const uploadDir = path.join(__dirname, "uploads");

// Check if the upload directory exists, create it if it doesn't

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

const extractText = (path) => {

}

app.post('/upload', upload.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }


    console.log("File uploaded:", req.file.path);

    let dataBuffer = fs.readFileSync(req.file.path);

    pdf(dataBuffer).then(function (data) {
        fs.unlinkSync(req.file.path)
        res.send(data.text)
    });



});



const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
