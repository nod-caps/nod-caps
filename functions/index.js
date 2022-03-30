const functions = require("firebase-functions");

const stripe = require("stripe")(functions.config().stripe.key);

exports.stripeCheckout = functions.https.onCall(async (data, context) => {
  const productId = data["id"];
  console.log("product id = " + productId);
  const price = 10;
  const name = "hello";
  // const image = "";
  const description = "hello there hello there";
  // if you know the docId
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: name,
        description: description,
        // images: [image],
        amount: Math.round(price * 100),
        currency: "gbp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8100/cheers",
    cancel_url: "http://localhost:8100/cancel",
  });

  return session.id;
});
