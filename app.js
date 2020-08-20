const express = require('express')
const app = express()
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Set constant PORT variable to listen to port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

//GET function that displays all the data in 'web-projects.json'
app.get('/api', (req, res) => { 
    fs.readFile('web-projects.json', (err, data) => {
        if (err) res.send('File not found. First post to create file.');
        else
        res.send(JSON.parse(data));
    })
});

//POST function to add a new item to array.
app.post('/api', (req, res) => {
    fs.readFile('web-projects.json', (err, data) => { //use fs readfile function.
        if (err) res.send('File not found. First post to create file.');
        else
        var existingData = JSON.parse(data); //parse json data.
        var updateItem = {id: Number(req.body.id), title: req.body.title};
        existingData.push(updateItem); //push new params into array.
        fs.writeFile('web-projects.json', JSON.stringify(existingData), (err) => { //stringify data and write json file again.
            if (err) throw err;
            res.send(updateItem);
        });
    });
});

//PUT function to change item in array.
app.put('/api', (req, res) => {
    fs.readFile('web-projects.json', (err, data) => { //use fs readfile function.
        if (err) res.send('File not found. First post to create file.');
        else
        var existingData = JSON.parse(data); //parse json data.
        var targetItem = existingData.find(item => item.id === Number(req.body.id)); //find target item in array.
        targetItem.title = req.body.title //replace with new title.
        fs.writeFile('web-projects.json', JSON.stringify(existingData), (err) => { //stringify data and write json file again.
            if (err) throw err;
            res.send(targetItem);
        });
    });
});

//DELETE function
app.delete('/api', (req, res) => { 
    fs.readFile('web-projects.json', (err, data) => {  //use fs readfile function.
        if (err) res.send('File not found. First post to create file.');
        else
        var existingData = JSON.parse(data); //parse json data.
        var updatedData = existingData.filter(item => item.id !== Number(req.param('id'))); //used filter() to return all items in array that don't match id.
        fs.writeFile('web-projects.json', JSON.stringify(updatedData), (err) => { //stringify data and write json file again.
            if (err) throw err;
            res.send(updatedData);
        });
    });
});

//Error message.
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
});

//Change Express’ App.js file to call React build assets
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
    'frontend', 'build','index.html'));
    });
}
