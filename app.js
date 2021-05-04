const express=require("express")
const bodyParser=require("body-parser")
const https=require("https")

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    
    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data)

    const url= "https://us1.api.mailchimp.com/3.0/lists/4d479de215";

    const option={
        method:"POST",
        auth:"davy7:9bc3e0e9b0effa93bd72cb9ec3379600-us1"
    };

 const request= https.request(url,option,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    } else{
        res.sendFile(__dirname+"/failure.html")
    }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
 
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})



app.listen(process.env.PORT|| 3000,()=>{
    console.log("the server is running on port 3000");
})





 
