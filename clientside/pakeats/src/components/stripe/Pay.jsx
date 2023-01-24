import { useState,useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const KEY = "pk_test_51LxAfgFHvBTKPFKJbm6YYyeXjXoYUjv2GSDpGzHafHzMEAAlGDLHcaAjJ4SyCDtHFBlr9H7uWxPSm2spHjyZtzBe00SRkB9lsZ";

const Pay = () => {
    const [stripeToken,serStripeToken] = useState(null);

    const onToken = (token)=>{
        serStripeToken(token)
    }

    useEffect(()=>{
        const makeRequest =async ()=>{
            try{
                const res = await axios.post("http://localhost:5000/api/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:2000,
                }
                );
                console.log(res.data);

            }catch(err){
                console.log(err)
            }
        }
        stripeToken && makeRequest ()
    },[stripeToken])
  return (
    <StripeCheckout
    name='Pakeats'
    image='https://avatars.githubusercontent.com/u/68862301?s=48&v=4'
    billingAddress
    shippingAddress
    description='Your Payment is $20'
    amount={2000}
    token={onToken}
    stripeKey={KEY}
    >
        <button>Pay</button>
    </StripeCheckout>
  )
}

export default Pay