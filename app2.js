const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

var restaurants = [];
var temp = [];
var usedPosition = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) => {
    res.render('add-restaurant');
});

app.post('/', (req, res, next) => {
    var name = req.body.name;
    var position = req.body.position;
    var category = req.body.category;
    var rating = req.body.rating;
    if(!name || !position || !category || !rating){
        res.status(400).json({message:"There are missing fields"});
    }
    else if(position > 200 || position < 0){
        res.status(400).json({message:"position must be an integer from 0 to 200"});
    }
    else if(rating > 5 || rating < 0){
        res.status(400).json({message:"rating must be an integer from 0 to 5"});
    }
    else{
        if(restaurants.length>0){
            if(usedPosition.includes(position)){
                res.status(400).json({message:"Position not available"});
            }
            else {
                temp.push({name:name, position:position, category:category, rating:rating});
                restaurants.push({name:name, position:position, category:category, rating:rating});
                usedPosition.push(position);
                res.status(201).json(temp[0]);
                temp.pop();
            }
        }
        else {
            temp.push({name:name, position:position, category:category, rating:rating});
            restaurants.push({name:name, position:position, category:category, rating:rating});
            usedPosition.push(position);
            res.status(201).json(temp[0]);
            temp.pop();
        }
    }
});

app.get('/restaurant', (req, res, next) => {
    res.render('find-restaurant');
});

app.post('/restaurant', (req, res, next) => {
    var orderPriority = req.body.orderPriority;
    var position = req.body.position;
    var distanceLimit = req.body.distanceLimit;
    var category = req.body.category;

    if(!orderPriority || !position || !category){
        res.status(400).json({message:"There are missing fields"});
    }
    else {
        if (!Number.isInteger(Number(distanceLimit))) {
            res.status(400).json({message:"Distance Limit should be an integer"});
        }
        if(!distanceLimit){
            distanceLimit = 30;
        }
        if(!orderPriority === "distance" || !orderPriority ==="rating"){
            res.status(400).json({message:"Order priority should be either distance or rating"});
        }
        else{
            if(orderPriority === "rating"){
                restaurants.sort((item1, item2) => item1.rating - item2.rating);
                var filterItems= restaurants.filter(item => item.category === category);
                res.status(200).json(filterItems);
            }
            else {
                restaurants.sort((item1, item2) => item1.position - item2.position);
                var filterItems= restaurants.filter(item => item.category === category);
                res.status(200).json(filterItems);
            }
        }
    }
});

app.get('/delete', (req, res,next) => {
    res.status(200).render('delete-restaurants', restaurants);
    
});

app.delete('/restaurant', (req, res,next) => {
    restaurants.length =0;
    res.sendStatus(204);
});

app.listen(3000);