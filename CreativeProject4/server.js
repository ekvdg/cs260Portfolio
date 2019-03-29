const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//app.use(express.static('Public'));


mongoose.connect('mongodb://localhost:27017/cart', {
  useNewUrlParser: true
});

// const multer = require('multer')

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  quantity: Number,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async (req, res) => {
  const item = await Item.findOne({id: req.body.id});

  if(item != null) {
    item.quantity = item.quantity + 1;
    await item.save();
    res.send(item);
  } else {
    const item = new Item({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    try {
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async(req, res) =>{
  try{
    const item = await Item.deleteOne({id: req.params.id});
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async(req, res) =>{
  try{
    const item = await Item.findOne({id: req.params.id});
    item.quantity = item.quantity + req.body.quantity;
    if(item.quantity <= 0) {
      item.quantity = 0;
      res.send(false);
    } else {
      await item.save();
      res.send(true);
    }
  } catch{
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(8080, () => console.log('Server listening on port 8080!'));
