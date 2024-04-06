const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const cors = require('cors')
const OpenAI = require('openai')
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors())
const uploadDir = path.join(__dirname, "uploads");





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



app.post('/upload', upload.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }


    console.log("File uploaded:", req.file.path);

    let dataBuffer = fs.readFileSync(req.file.path);

    pdf(dataBuffer).then(function (data) {
        fs.unlinkSync(req.file.path)
        console.log(typeof data.text)
        res.send(data.text)
    });
});

app.post('/simplify', async (req, res) => {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI,
    });
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: ` ${req.body.text} simplify this for a non legal professional in points  - give the response in markdown language`,
            },
        ],
        temperature: 0.7,


    });
    const simpleText = completion.choices[0].message.content;

    res.json({ simpleText: simpleText });
    res.sendStatus(200)

    // } catch (error) {
    //     res.status(400);
    //     res.send(error);
    // }
})



const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
