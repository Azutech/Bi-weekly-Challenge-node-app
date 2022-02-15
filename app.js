

const express = require ('express');

const app = express();
const fs = require('fs');

app.use(express.json());





// PARAMS //


app.get('/api/v1/tours/:id', (req, res) => {

    console.log(req.params);
    const id = re.params.id * 1 

    const tour =tours.find(el => el.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            Message: "Invalid id"
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })

})

// GET END-POINT

const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'Success',
        Data:{
            tours
        }
    });
});

// POST END-POINT


app.post('/api/v1/tours', (req, res) =>{
    // console.log(req.body);

    const postId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: postId}, req.body);

    tours.push(newTour)
    fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status : 'Posted',
            Data:{
                tours : newTour
            }
        })
    })
        
})

// PUT ENDPOINT

app.put('/api/v1/tours/:id', (req, res) => {

    if(req.params.id * 1 > tours){
        return res.status(404).json({
            status: "fail",
            Message: "Invalid id"
        })
    }

    res.status(204).json({
        status: 'success',
        data: {
           tours: '<Updated tours>....'
        }
    })

})

// DELETE END POINT

app.delete('/api/v1/tours/:id', (req, res) => {

    if(req.params.id * 1 > tours){
        return res.status(404).json({
            status: "fail",
            Message: "Invalid id"
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })

})

const port = 3000;
app.listen(port, () =>{
    console.log(`App is runnin at port ${port}....`)
});