// import * as fs from "fs";
// import express from "express";
const express = require("express")
const fs = require("fs")

const path = require("path")

const dirPath = path.join(__dirname, 'timestamps')

const data=[
    {
        id:"1",
        numberOfSeats:100,
        amenities:["AC","chairs","discolights"],
        price:5000,
        ifBooked:"true",
        customerName:"chandra",
        date: "29-oct-2000",
        RoomId:201,
        RoomName:"Duplx"
    },
    {
    id:"2",
    numberOfSeats:100,
    amenities:["AC","chairs","discolights"],
    price:5000,
    ifBooked:"true",
    customerName:"raghavan",
    date: "25-july-2003",
    RoomId:202,
    RoomName:"Duplex"
}
]
// Initialization Express server
const app = express()

//to read json for post request
app.use(express.json())

//middleware
app.use(express.static("timestamps"))


//API(creating server)
 app.get('/',(req,res)=>{ 
    res.send("hey there  working good")
 })

app.get("/static", (req,res)=>{
    let time = new Date();
    let dateString = time.toUTCString().slice(0,-3)
    console.log(dateString)
    let timest = `last update timestamp is: ${dateString}`

    fs.writeFileSync(`${dirPath}/new_text.txt`, timest, (err)=>{
        // if(err){
        //     console.log('err')
        // }else{
        //     console.log('file created successfully')
        // }
    })
    res.sendFile(path.join(__dirname,"timestamps/new_text.txt"))
})

// app.get("/static", (req,res)=>{
//     let time = new Date();
//     let dateString = time.toUTCString().slice(0,-3)
//     console.log(dateString)
//     let content = `last update timestamp is ${dateString}`

//     fs.writeFileSync("./new_text.txt", content, (err)=>{
//         if(err){
//             console.log('err')
//         }else{
//             console.log('file created successfully')
//         }
//     })
//     res.send("file created successfully")
// })
//  app.listen(8009,()=>console.log("server started in local host:8009"))

// console.log("4")

// console.log(process.argv)

// fs.readFile("./sample.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("file read successfully")
//         console.log(data)
//     }
// })

//get hall details

// app.get("/hall/details",(req,res)=>{
//     res.send(data)})

app.get("/hall/details",(req,res)=>{
    if(req.query){
    const {ifBooked} = req.query;
    console.log(ifBooked)
    let filteredHall = data;
    if(ifBooked){
        filteredHall = filteredHall.filter((halls)=>halls.ifBooked === ifBooked)
    }
    res.send(filteredHall)
}else{
    res.send(data)
}
})

app.get("/hall/details/:id",(req,res)=>{
    const {id} = req.params
    console.log(id)
    // res.send(data)})
  const specificHall = data.find(hall=>hall.id === id);
    res.send(specificHall)})

//Post method : book new hall
app.post("/hall/details/",(req,res)=>{
    const newHall={
        id : data.length+1,
        numberOfSeats : req.body.numberOfSeats,
        amenities : req.body.amenities,
        price : req.body.price,
        ifBooked : req.body.ifBooked,
        RoomId : req.body.RoomId,
        customerName:req.body.customerName,
        date:req.body.data,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        RoomName:req.body.RoomName
        
    }
    console.log(req.body)
    data.push(newHall);
  res.send(data)
})

// // Put method to update the hall
app.put("/hall/details/:id",(req,res)=>{
    const {id} = req.params;
    const halls = data.find(hall=>hall.id===id);
    console.log(halls)

//     if(halls.ifBooked==='true'){
//    return res.status(400).send("hey the hall is already booked")
// }
halls.date= req.body.date;
halls.startTime=req.body.startTime;
halls.endTime=req.body.endTime;
halls.customerName=req.body.customerName;
halls.ifBooked="true"

return res.status(200).send(data)
})

app.listen(8009,()=>console.log("server started in local host:8009"))