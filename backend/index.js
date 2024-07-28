const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const dataFolder = path.join(__dirname, 'DATABASE');
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// Endpoint to create a collection
app.post('/api/collections', (req, res) => {
    const { collectionName } = req.body;
    const collectionPath = path.join(dataFolder, collectionName);

    if (!fs.existsSync(collectionPath)) {
        fs.mkdirSync(collectionPath);
        return res.json({ message: 'Collection created successfully' });
    } else {
        return res.status(400).json({ error: 'Collection already exists' });
    }
});

// Endpoint to list all collections
app.get('/api/collections', (req, res) => {
    fs.readdir(dataFolder, (err, collections) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read collections' });
        }
        const directories = collections.filter(collection => fs.lstatSync(path.join(dataFolder, collection)).isDirectory());
        res.json(directories);
    });
});

// Endpoint to delete a collection
app.delete('/api/collections/:collection', (req, res) => {
    const collectionPath = path.join(dataFolder, req.params.collection);
    if (fs.existsSync(collectionPath)) {
        fs.rmdirSync(collectionPath, { recursive: true });
        return res.json({ message: 'Collection deleted successfully' });
    }
    res.status(404).json({ error: 'Collection not found' });
});

// Endpoint to create a folder within a collection
app.post('/api/collections/:collectionName/folders', (req, res) => {
    const { folderName } = req.body;
    const collectionPath = path.join(dataFolder, req.params.collectionName);
    const folderPath = path.join(collectionPath, folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        return res.json({ message: 'Folder created successfully' });
    } else {
        return res.status(400).json({ error: 'Folder already exists' });
    }
});

// Endpoint to list all folders within a collection
app.get('/api/collections/:collectionName/folders', (req, res) => {
    const collectionPath = path.join(dataFolder, req.params.collectionName);

    if (!fs.existsSync(collectionPath)) {
        return res.status(400).json({ error: 'Collection does not exist.' });
    }

    fs.readdir(collectionPath, (err, folders) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read folders' });
        }
        const directories = folders.filter(folder => fs.lstatSync(path.join(collectionPath, folder)).isDirectory());
        res.json(directories);
    });
});

// Endpoint to delete a folder within a collection
app.delete('/api/collections/:collectionName/folders/:folderName', (req, res) => {
    const folderPath = path.join(dataFolder, req.params.collectionName, req.params.folderName);
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
        return res.json({ message: 'Folder deleted successfully' });
    }
    res.status(404).json({ error: 'Folder not found' });
});

// Endpoint to create a file in a folder within a collection
app.post('/api/collections/:collection/folders/:folder/create-file', (req, res) => {
    const { filename, data } = req.body;
    const folderPath = path.join(dataFolder, req.params.collection, req.params.folder);

    if (!filename || !data) {
        return res.status(400).json({ error: 'Filename and data are required.' });
    }

    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({ error: 'Folder does not exist' });
    }

    const filePath = path.join(folderPath, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ message: 'File created successfully' });
});

app.get('/api/collections/:collection/folders/:folder/files', (req, res) => {
    const { collection, folder } = req.params;
    const folderPath = path.join(dataFolder, collection, folder);

    if (!fs.existsSync(folderPath)) {
        return res.status(400).json({ error: 'Folder does not exist.' });
    }

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read files' });
        }
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        res.json(jsonFiles);
    });
});

// Endpoint to get data from a specific JSON file within a folder within a collection
app.get('/api/collections/:collectionName/folders/:folderName/files/:filename', (req, res) => {
    const { collectionName, folderName, filename } = req.params;
    const filePath = path.join(dataFolder, collectionName, folderName, `${filename}`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to update a specific JSON file within a folder within a collection
app.put('/api/collections/:collectionName/folders/:folderName/files/:filename', (req, res) => {
    const { collectionName, folderName, filename } = req.params;
    const newData = req.body;
    const filePath = path.join(dataFolder, collectionName, folderName, `${filename}`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    fs.writeFile(filePath, JSON.stringify(newData, null, 2), err => {
        if (err) {
            return res.status(500).json({ error: 'Unable to update file' });
        }
        res.json({ message: 'File updated successfully' });
    });
});

// Endpoint to delete a specific JSON file within a folder within a collection
app.delete('/api/collections/:collectionName/folders/:folderName/files/:filename', (req, res) => {
    const { collectionName, folderName, filename } = req.params;
    const filePath = path.join(dataFolder, collectionName, folderName, `${filename}`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    fs.unlink(filePath, err => {
        if (err) {
            return res.status(500).json({ error: 'Unable to delete file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
