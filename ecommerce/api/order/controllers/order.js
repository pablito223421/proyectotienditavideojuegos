'use strict';
const stripe = require ("stripe")("sk_test_51KBfyIA7HSjDwz2ekboyJ168Hol1ZbbEl89DnSoj19olMMF8aUXslHSiAR8n6tgqxCrVcIZ3Zwxa1oO8rthse0sV00dfAiDxS6");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
 async create (ctx){
     const {token,products,idUser,addressShipping} = ctx.request.body;
     let totalPayment=0;
     products.foreach(product=>{
      totalPayment= totalPayment + product.price;
     });

     const charge =await stripe.charges.create({
      amount : totalPayment * 100,
      currency : "eur",
      source: token.id,
      description: `ID Usuario:${idUser}`,
     });

 const createOrder=[];
 for await(const product of products){
     const data ={
         game:product.id,
         user:idUser,
         totalPayment,
         idPayment: charge.id,
         addressShipping,
     };
const validData= await strapi.entityValidator.validateEntity(
strapi.models.order,
data
);
const entry= await strapi.query("order").create(validData);
createOrder.push(entry);
 }
 return createOrder;
 },
};
