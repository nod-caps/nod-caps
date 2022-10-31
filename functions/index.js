const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const admin = require("firebase-admin");
// Sendgrid Config
const sgMail = require("@sendgrid/mail");
const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = "d-75d3d51077944d4e9093a2d953609e9c";

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
    success_url: "http://www.nodcaps.com/cheers?on=" + orderNumber,
    cancel_url: "http://www.nodcaps.com/shop",
  });

  if (!session.id) {
    throw new functions.https.HttpsError("No session.id was found");
  }

  return session.id;
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  let event;

  try {
    const whSec = functions.config().stripe.payment_webhook_secret;

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
  const caps = [];
  const timestamp = new Date().getTime();
  const dateString = new Date().toISOString().split("T")[0];
  const n = dataObject.success_url.lastIndexOf("cheers?on=");
  const orderNumberFromString = dataObject.success_url.substring(n + 10);
  let index = 0;
  for (const item of lineItems.line_items.data) {
    lineItems.line_items.data[index].priceId = item.price.id;
    const capPrice = item.amount_total / 100;
    lineItems.line_items.data[index].capPrice = capPrice.toFixed(2);
    // delete lineItems.line_items.data[index].price;

    const ref = admin.firestore().collection("caps");
    await ref.where("name", "==", lineItems.line_items.data[index].description)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(document) {
            if (document.data()) {
              const quantity = document.data().quantity - item.quantity;
              document.ref.update({quantity: quantity});
              lineItems.line_items.data[index].cap = document.data();
              caps.push(document.data());
              delete lineItems.line_items.data[index].id;
              if (index === lineItems.line_items.data.length -1) {
                admin.firestore().collection("orders").doc().set({
                  paymentStatus: dataObject.payment_status,
                  shippingInfo: dataObject.shipping_details,
                  amountTotal: dataObject.amount_total,
                  customerName: dataObject.customer_details.name,
                  customerEmail: dataObject.customer_details.email,
                  paymentIntent: dataObject.payment_intent,
                  lineItems: lineItems.line_items.data,
                  date: timestamp,
                  dateString: dateString,
                  orderNumber: orderNumberFromString,
                });
                return res.sendStatus(200);
              }
            }
          });
        });
    index++;
  }
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

exports.checkIfAContact = functions.https.onCall(async (data, context) => {
  let showOptIn = true;
  const customerEmail = data["customerEmail"];
  const orderNumber = data["orderNumber"];
  const ref = admin.firestore().collection("contacts");
  await ref.where("email", "==", customerEmail)
      .get()
      .then( function(querySnapshot) {
        if (querySnapshot.empty) {
          showOptIn = true;
        } else {
          querySnapshot.forEach(function(document) {
            if (document.data().meta.state === "SUCCESS") {
              showOptIn = false;
              document.ref.update({line: "ask_review", phone_number: orderNumber});
            } else {
              showOptIn = true;
            }
          });
        }
      });
  return showOptIn;
});

exports.checkIfAContactUniqueName = functions.https.onCall(async (data, context) => {
  let order;
  let orders = [];
  let emailAddress = "";
  const uniqueName = data["uniqueName"];
  const orderNumber = data["orderNumber"];
  const ref = admin.firestore().collection("contacts");
  await ref.where("unique_name", "==", uniqueName)
      .get()
      .then( async function(querySnapshot) {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function(document) {
            if (document.data().meta.state === "SUCCESS" && document.data().custom_fields.e3_T === orderNumber) {
              emailAddress = document.data().email;
            }
          });
          const ref = admin.firestore().collection("orders");
          await ref.where("customerEmail", "==", emailAddress)
              .get()
              .then(function(querySnapshot) {
                if (!querySnapshot.empty) {
                  querySnapshot.forEach(function(document) {
                    if (document.data()) {
                      const tempOrder = document.data();
                      tempOrder.docRef = document.ref._path.segments[1];
                      const price = document.data().amountTotal / 100;
                      tempOrder.totalPrice = price.toFixed(2);
                      orders.push(tempOrder);
                    }
                  });
                  if (orders.length > 0) {
                    orders = orders.sort((a, b) => (a.date < b.date) ? 1 : -1);
                    order = orders[0];
                    const publicOrder = {
                      docRef: order.docRef,
                      emailSent: order.emailSent,
                      date: order.date,
                      dateString: order.dateString,
                      orderNumber: order.orderNumber,
                      lineItems: order.lineItems,
                      showOptIn: true,
                    };
                    order = publicOrder;
                  }
                }
              });
        }
      });
  return order;
});

exports.getOrderWithOrderNumber = functions.https.onCall(async (data, context) => {
  let order;
  let orders = [];
  const orderNumber = data["orderNumber"];
  const ref = admin.firestore().collection("orders");
  await ref.where("orderNumber", "==", orderNumber)
      .get()
      .then(async function(querySnapshot) {
        if (querySnapshot.empty) {
          order = undefined;
        } else {
          querySnapshot.forEach(function(document) {
            if (document.data()) {
              const tempOrder = document.data();
              tempOrder.docRef = document.ref._path.segments[1];
              const price = document.data().amountTotal / 100;
              tempOrder.totalPrice = price.toFixed(2);
              orders.push(tempOrder);
            } else {
              order = undefined;
            }
          });
          if (orders.length > 0) {
            orders = orders.sort((a, b) => (a.date < b.date) ? 1 : -1);
            order = orders[0];
            const emailAddress = order.customerEmail;
            const publicOrder = {
              docRef: order.docRef,
              emailSent: order.emailSent,
              date: order.date,
              dateString: order.dateString,
              orderNumber: order.orderNumber,
              lineItems: order.lineItems,
              showOptIn: true,
              totalPrice: order.totalPrice,
              customerEmail: order.emailSent ? undefined : order.customerEmail,
            };
            order = publicOrder;
            if (!order.emailSent) {
              const ref = admin.firestore().collection("contacts");
              await ref.where("email", "==", emailAddress)
                  .get()
                  .then(function(querySnapshot) {
                    if (!querySnapshot.empty) {
                      querySnapshot.forEach(function(document) {
                        if (document.data().meta.state === "SUCCESS") {
                          order.showOptIn = false;
                          document.ref.update({
                            custom_fields: {
                              e1_T: "ask_review",
                              e3_T: order.orderNumber,
                            },
                          });
                        }
                      });
                    }
                  });
            }
          }
        }
      });
  return order;
});
