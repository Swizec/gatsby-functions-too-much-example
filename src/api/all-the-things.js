const sendgrid = require("@sendgrid/mail");
const twilio = require("twilio");
const fireAdmin = require("firebase-admin");

const NUMBERS_TO_NOTIFY = process.env.NUMBERS_TO_NOTIFY.split(",");

const firebaseServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
firebaseServiceAccount.private_key = firebaseServiceAccount.private_key.replace(
    /\\n/g,
    "\n"
);
fireAdmin.initializeApp({
    credential: fireAdmin.credential.cert(firebaseServiceAccount),
});

//Your API Key from Sendgrid
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const message = {
    //Your authorized email from SendGrid
    from: process.env.SENDGRID_AUTHORIZED_EMAIL,
};

// Your SID and token from Twilio
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.json({ message: "Try a POST!" });
        }

        if (req.body) {
            message.to = req.body.email;
            message.subject = req.body.subject;
            message.text = req.body.text;
            message.html = req.body.text;
        }

        db = fireAdmin.firestore();

        const docRef = db.collection("emails").doc(message.subject);
        await docRef.set(message);

        await sendgrid.send(message);

        for (const recipient of NUMBERS_TO_NOTIFY) {
            await twilioClient.messages.create({
                body: `An email was just sent to ${message.to}`,
                to: recipient,
                from: process.env.TWILIO_NUMBER,
            });
        }

        return res.status(200).json({
            message: "Email sent",
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ message: "There was an error", error: err });
    }
};

module.exports = handler;
