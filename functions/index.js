const functions = require("firebase-functions");
const Mailchimp = require("mailchimp-api-v3");
const mailchimp = new Mailchimp("daca0e7c466fa98bea02b4736cd53c01-us13");
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
    success_url: "http://localhost:8100/cheers/" + orderNumber,
    cancel_url: "http://localhost:8100/shop",
  });

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
  const n = dataObject.success_url.lastIndexOf("/");
  const orderNumberFromString = dataObject.success_url.substring(n + 1);
  lineItems.line_items.data.forEach((item, index) => {
    lineItems.line_items.data[index].productId = item.price.product;
    lineItems.line_items.data[index].priceId = item.price.id;
    delete lineItems.line_items.data[index].price;
    const ref = admin.firestore().collection("caps");
    ref.where("description", "==", item.description)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(document) {
            const quantity = document.data().quantity - item.quantity;
            document.ref.update({quantity: quantity});
          });
        });
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

exports.addPurchaserToMailchimp = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.end();
  } else {
    mailchimp.post("/lists/adcf6c4f48/members", {
      merge_fields: {
        "FNAME": req.body.fname,
        "LNAME": req.body.lname,
      },
      email_address: req.body.email,
      status: "subscribed",
      tags: ["purchased"],
    })
        .then(function(results) {
          res.json(results);
        })
        .catch(function(err) {
          res.json(err);
        });
  }
});

exports.addPurchaserToMailchimp2 = functions.https.onCall((data, context) => {
  const order = data["order"];
  const msg = {
    to: "joesscales@gmail.com",
    from: "info@nodcaps.com",
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      subject: "hello there",
      order: order,
    },
  };
  return sgMail.send(msg);
});
