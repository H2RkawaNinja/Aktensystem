const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/filesystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
  name: String,
  content: String,
});

const File = mongoose.model('File', fileSchema);

app.get('/files', async (req, res) => {
  const files = await File.find();
  res.json(files);
});

app.post('/files', async (req, res) => {
  const newFile = new File(req.body);
  await newFile.save();
  res.json(newFile);
});

app.put('/files/:id', async (req, res) => {
  const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedFile);
});

app.delete('/files/:id', async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: 'File deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
