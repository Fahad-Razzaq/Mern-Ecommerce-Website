const router = require("express").Router();
const stripe =require("stripe")("sk_test_51LxAfgFHvBTKPFKJWv1jfxExSYoXAIWCQbanyfSwXdyLkremNBtA9kQzYjKFP5May935qo5ggUFccecYibZYHjgg00a945SJd0");


router.post("/payment", (req,res)=>{
    console.log(req.body)
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) =>{
        if(stripeErr){
            res.send(stripeErr)
        }else{
            res.send(stripeRes)
        }
    });
});


module.exports = router;