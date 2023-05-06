import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const db = mysql.createConnection({
    host:   'localhost',
    user: 'root',
    password: 'root123',
    database: 'test'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("MySQL Connected...");
});

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//test route for checking stupid stuff :P
// app.get('/get', (req, res) => {
//     let sql = 'SELECT * FROM notes';
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//         res.send(JSON.stringify(result));
//     })
// })



app.get('/getWoodpiles', (req, res) => {
    let sql = "SELECT woodpiles.woodpileNumber, projects.name AS 'projectName' FROM woodpiles INNER JOIN projects ON woodpiles.projectId = projects.id";
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

app.post('/sendLogMeasurement', async (req, res) => {
    let createMeasurementQuery = `INSERT INTO measurements (measurementPurpose, totalVolumeM3, logCount, logLength) VALUES (
        '${req.body[0].measurementPurpose}',
        '${Number(req.body[0].volume)}',
        '${req.body[0].count}',
        '${req.body[0].logLength}'
    )`;
    
    let toSendBack;

    db.query(createMeasurementQuery, (err, result) => {
        if(err) throw err;
        
        //if I was able to create the measurement, then I wish to send the logs as well

        if(result.affectedRows === 1) {
            const measurementId = result.insertId;

            //first I need to get Project and Woodpile id 
            
            
            for (let i=1; i<req.body.length; i++) {

                let query = `SELECT id, projectId FROM woodpiles WHERE woodpileNumber='${req.body[i].logWoodpile}'`;
                
                db.query(query, (err, result) => {
                    if (err) throw err;
                    
                    query = `INSERT INTO logMeasurements (number, length, diameter, volumeM3, measurementPurpose, woodpileId, projectId, measurementId)
                    VALUES (
                        '${req.body[i].logNumber}',
                        '${req.body[i].logLength}',
                        '${req.body[i].logDiameter}',
                        '${req.body[i].logVolume}',
                        '${req.body[i].logMeasurementPurpose}',
                        '${result[0].id}',
                        '${result[0].projectId}',
                        '${measurementId}'
                    )
                    `;
                    
                    
                    db.query(query, (err, result) => {
                        if (err) throw err;
                        
                    });

                    //
                })

            }
            return res.send(`${measurementId}`);      
        }

        

    });

});

app.listen('3005', () =>{
    console.log("Server started on port 3005");
})