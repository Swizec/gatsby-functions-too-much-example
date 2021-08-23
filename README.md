<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=gatsby-functions-beta">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Functions SendGrid Example
</h1>

## 🚀 Quick start

1.  **Get SendGrid Credentials.**

    Create an account on [SendGrid](https://sendgrid.com/) and verify a "single sender" email address that the function will use for sending emails.

    Add the following **2** environment variables to a file named `.env.development`. You'll need these for the function to be able to send emails:

    - `SENDGRID_API_KEY`: An SendGrid API Key with full access. [SendGrid Docs](https://sendgrid.com/docs/ui/account-and-settings/api-keys/)
    - `SENDGRID_AUTHORIZED_EMAIL`: the "single sender" the email address you verified with SendGrid [SendGrid Docs](https://sendgrid.com/docs/glossary/sender-authentication/)

    Read more about how Gatsby handles `.env` files and environment variables in the [Gatsby Docs](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/)

2. **Get Twilio Credentials*

    Create an account on [Twilio](https://twilio.com) and create a phone number. You'll need:

    - `TWILIO_SID`: the Twilio account ID found on the dashboard
    - `TWILIO_TOKEN`: a secret token also found on the dashboard
    - `TWILIO_NUMBER`: a phone number you buy under the Phone Numbers page (free during trial), this is the number you'll send from

    - `NUMBERS_TO_NOTIFY`: list of comma separated phone numbers to text when an email is sent

3. **Get Firestore Credentials**

    Create a new Firebase application then create a database (in test mode for simplicity). Under Project Settings, create a service account. You'll get a JSON with a bunch of data.

    Stringify it into the `FIREBASE_SERVICE_ACCOUNT` env var.

    You can run this code in Node.js to do that:

    ```
    const json = require('./file-name.json')
    JSON.stringify(json)
    ```

    You'll also want to add these as environment variables when deploying to Gatsby Cloud. Don't forget to add them to the Preview variables if you plan to add a CMS preview integration.

4.  **Start developing.**

    To get started, run `npm install` to install all necessary packages.

    ```shell
    cd examples/functions-sendgrid-email
    npm install
    npm run develop
    ```

5.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000! You can use the UI on the index page to test the functions or directly access them at http://localhost:8000/api/sendgrid

    Edit `src/pages/index.js` to see your site update in real-time!

6.  **Deploy**

You can deploy this example on Gatsby Cloud by copying the example into a new repo and [connecting that to Gatsby Cloud](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-gatsby-cloud/#set-up-an-existing-gatsby-site).
