const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

var restaurants = [];
var temp = [];
var usedPosition = [];

app.post('/restaurant', (req, res, next) => {
    var data = req.body;
    var name = data.name;
    var position = data.position;
    var category = data.category;
    var rating = data.rating;
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

var tempRes = []
app.post('/restaurants', (req, res, next) => {
    var data = req.body;
    var orderPriority = data.orderPriority;
    var position = data.position;
    var distanceLimit = data.distanceLimit;
    var category = data.category;

    if(restaurants.length = 0){
        res.status(200).json(restaurants);
    }
    
    res.redirect('/restaurants');
});

app.get('/restaurant', (req, res, next) => {
    var data = req.body;
    var orderPriority = data.orderPriority;
    var position = data.position;
    var distanceLimit = data.distanceLimit;
    var category = data.category;

    if(!orderPriority || !position || !category){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({message:"There are missing fields"});
    }
    else {
        if(!distanceLimit){
            distanceLimit = 30;
        }

        if(position > 200 || position < 0){
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({message:"position must be an integer from 0 to 200"});
        }

        if (!Number.isInteger(Number(distanceLimit))) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({message:"Distance Limit should be an integer"});
        }
        
        if(!orderPriority === "distance" || !orderPriority ==="rating"){
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({message:"Order priority should be either distance or rating"});
        }
        else{
            if(orderPriority === "rating"){
                restaurants.sort((item1, item2) => item1.rating - item2.rating);
                var upperPosition = position + distanceLimit;
                var lowerPosition = Math.max((position-distanceLimit), 0);
                var filterItems= restaurants.filter(item => item.category === category && item.position <= upperPosition && item.position >= lowerPosition);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(filterItems);
            }
            else {
                restaurants.sort((item1, item2) => item1.position - item2.position);
                var filterItems= restaurants.filter(item => item.category === category && item.position <= upperPosition);
                var upperPosition = position + distanceLimit;
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(filterItems);
            }
        }
    }
});


app.delete('/restaurant', (req, res, next) => {
    restaurants.length =0;
    res.sendStatus(204);
});

app.listen(3000);