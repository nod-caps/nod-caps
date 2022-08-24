const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const admin = require("firebase-admin");
// Sendgrid Config
const sgMail = require("@sendgrid/mail");

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);
admin.initializeApp();

exports.stripeCheckout = functions.https.onCall(async (data, context) => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const checkoutArray = data["checkoutArray"];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: checkoutArray,
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    mode: "payment",
    success_url: "https://projecttwo-c4839.web.app/cheers?on=" + orderNumber,
    cancel_url: "https://projecttwo-c4839.web.app/shop",
  });

  if (!session.id) {
    throw new functions.https.HttpsError("No session.id was found");
  }

  return session.id;
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  let event;

  try {
    const whSec = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        whSec,
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.");
    return res.sendStatus(400);
  }

  const dataObject = event.data.object;
  const lineItems = await stripe.checkout.sessions.retrieve(
      dataObject.id,
      {
        expand: ["line_items"],
      },
  );

  const timestamp = new Date().getTime();
  const dateString = new Date().toISOString().split("T")[0];
  const n = dataObject.success_url.lastIndexOf("cheers?on=");
  const orderNumberFromString = dataObject.success_url.substring(n + 10);
  lineItems.line_items.data.forEach((item, index) => {
    const ref = admin.firestore().collection("caps");
    ref.where("description", "==", item.description)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(document) {
            const quantity = document.data().quantity - item.quantity;
            document.ref.update({quantity: quantity});
          });
        });
    lineItems.line_items.data[index].priceId = item.price.id;
    delete lineItems.line_items.data[index].price;
  });

  await admin.firestore().collection("orders").doc().set({
    checkoutSessionId: dataObject.id,
    paymentStatus: dataObject.payment_status,
    shippingInfo: dataObject.shipping,
    amountTotal: dataObject.amount_total,
    customerId: dataObject.customer,
    customerName: dataObject.customer_details.name,
    customerEmail: dataObject.customer_details.email,
    paymentIntent: dataObject.payment_intent,
    lineItems: lineItems.line_items.data,
    date: timestamp,
    dateString: dateString,
    orderNumber: orderNumberFromString,
    /* shipment: {
      // carrierId: "se-423887",
      serviceCode: "ups_ground",
      shipDate: "2021-09-21",
      validateAddress: "no_validation",
      shipTo: {
        name: "Amanda Miller",
        addressLine1: "Flat 23, Lapwing Heights",
        cityLocality: "London",
        stateProvince: "LND",
        postalCode: "N17 9GP",
        countryCode: "GB",
      },
      shipFrom: {
        name: "John Doe",
        phone: "111-111-1111",
        addressLine1: "Clare House",
        addressLine2: "Mary Lane",
        cityLocality: "Sudbury",
        stateProvince: "SFK",
        postalCode: "CO10 8DY",
        countryCode: "GB",
      },
      packages: [
        {
          weight: {
            unit: "ounce",
            value: 1.0,
          },
        },
      ],
    }, */
  });

  /* admin
      .firestore()
      .collection("shipments")
      .add({
        shipment: {
          // carrierId: "se-423887",
          serviceCode: "ups_ground",
          shipDate: "2021-09-21",
          validateAddress: "no_validation",
          shipTo: {
            name: "Amanda Miller",
            addressLine1: "Flat 23, Lapwing Heights",
            cityLocality: "London",
            stateProvince: "LDN",
            postalCode: "N17 9GP",
            countryCode: "GB",
          },
          shipFrom: {
            name: "John Doe",
            phone: "111-111-1111",
            addressLine1: "Clare House",
            addressLine2: "Mary Lane",
            cityLocality: "Sudbury",
            stateProvince: "SFK",
            postalCode: "CO10 8DY",
            countryCode: "GB",
          },
          packages: [
            {
              weight: {
                unit: "ounce",
                value: 1.0,
              },
            },
          ],
        },
      }); */

  return res.sendStatus(200);
});

exports.addPurchaserToMailchimp2 = functions.https.onCall((data, context) => {
  const order = data["order"];
  const msg = {
    templateId: TEMPLATE_ID,
    from: "info@nodcaps.com",
    personalizations: [
      {
        to: [
          {
            email: "info@nodcaps.com",
          },
        ],
        dynamic_template_data: {
          order: order,
          subject: "order placed",
        },
      },
      {
        to: [
          {
            email: order.customerEmail,
          },
        ],
        dynamic_template_data: {
          order: order,
          subject: "order placed1",
        },
      },
    ],
  };
  return sgMail.send(msg);
});

exports.updateAverageReview = functions.https.onCall((data, context) => {
  const capRef = data["capRef"];
  const rating = data["newRating"];
  admin.firestore().collection("caps").doc(capRef)
      .get()
      .then((doc) => {
        if (doc) {
          const currentRating = doc.data().rating;
          const numberOfReviews = doc.data().numberOfReviews;
          if (!numberOfReviews) {
            admin.firestore().collection("caps").doc(capRef).update({rating: rating, numberOfReviews: 1});
          } else {
            let newRating = ((currentRating*numberOfReviews) + rating) / (numberOfReviews + 1);
            newRating = newRating.toFixed(2);
            admin.firestore().collection("caps").doc(capRef)
                .update({rating: newRating, numberOfReviews: numberOfReviews + 1});
          }
        } else {
          throw new functions.https.HttpsError("No cap was found for this capRef when updating average review");
        }
      });
  return;
});
