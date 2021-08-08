const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/images', async (request, response) => {
    const { resources } = await cloudinary.search
        .expression('folder:wculgurj')
        .sort_by('created_at', 'desc')
        .max_results(30)
        .execute();
    const publicIds = resources.map((file) => file.public_id);
    response.send(publicIds);
});

(
    app.post('/api/upload', async (request, response) => {
        try {
            const fileStr = request.body.data;
            const name = request.body.name;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'wculgurj',
                public_id: name,
            })
            console.log('Uploaded response:', uploadedResponse);
            response.json({ msg: 'UPLOADED!' });
        } catch (error) {
            console.error(error);
            response.status(500).json({ err: 'Something went wrong' });
        }
    }));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})