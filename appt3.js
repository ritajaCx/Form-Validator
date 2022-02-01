const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
var port =  process.env.PORT || 8099
const {body, checkSchema, check, validationResult } = require('express-validator')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.set("view engine", "ejs")

var cpassword;

app.get("/", function(req, res){
    res.render("register")
})


app.listen(port, function(err){
    if(err)
    {
        console.log("err in starting the server ", err)
    }
    console.log("Server started at ", port)
})


// var registrationSchema = {
    
//     //username
//     // username :{
//     //     not :{isEmail: true},
//     //     errorMessage : "Your Email Id will be used as Username"
//     // },
//     //password
//     password : {
//         isStrongPassword : {
//             minLength: 8,
//             minLowercase : 1,
//             minUppercase : 1,
//             minSpecial : 3
            
//         },
//         errorMessage : "Weak password, enter at least 3 Special Characters"
//     },
//     //mobile number
//     contact : {
//         notEmpty : true,
//         isLength : 10,
//         errorMessage : "Please enter a valid mobile number"
//     },
//     // passwordcnf:{
//     //     matches : cpassword,
//     //     errorMessage : "Password Confirmation Failed"

//     // },}
  
    


app.get('/savedata', function(res, req){
    res.render("register")
})

app.post('/savedata',
    
    
    body('username').custom((value, {req})=>{
        if(value !==req.body.name){
            throw new Error('Name would not be in Username');
        }
        return true;
    }),
    body('contact').isLength(10).withMessage("Please enter a valid mobile number"),
    body('password' ).isLength({minUppercase : 1, minLowercase :1, minLength:8, minSpecial:3}).withMessage("Enter password with at least 3 Aplhanumerics, Min 1 UpperCase, 1 Lowercase Characters "),
    body('passwordcnf').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      }),
    
    (req, res) => {
           
        
        const errors = validationResult(req)
        if( !errors.isEmpty() ){
            res.json({error: errors.array() })
        }
        else
        {
            res.send("<body style='background-color:bisque;color:darkcyan'><h2>Registration validated Successfully !</h2></body>")
        }
    },
);

    