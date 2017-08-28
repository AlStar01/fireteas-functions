# Fireteas Azure Functions

[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) written in JavaScript to perform serverless tasks such as sending emails via SMTP email relay.

## SendContactEmail

[HTTP triggered function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function) utilizing [nodemailer](https://github.com/nodemailer/nodemailer) to send emails via Gmail. Application settings (credentials) are retrieved/accessed via `process.env[settingName]` within the function. Application settings are defined in the Azure Portal for the defined Azure Function App with associated service plan and storage account.

To enable nodemailer to work with Gmail the following steps/authorizations must be taken:

1. When logged into the the Google/Gmail account you plan to send emails from, navigate to [Less secure apps](https://www.google.com/settings/security/lesssecureapps) and allow access.
2. Activate [Display Unlock Captcha](DisplayUnlockCaptcha)

## Local Development and Debugging

[Local development and debugging](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) of Azure Functions can be done using library [Azure Function Core Tools](https://www.npmjs.com/package/azure-functions-core-tools) (only available for windows currently). Application settings to attach to `process.env[settingName]` can be set in the `local.settings.json` file of the `"VALUES"` JSON property.


**local.settings.json**
```
"Values": {
    "FOO": "BAR"
}
```

**index.js**

```
module.exports = function (context, req) {
    const FOO = process.env["FOO"];
    context.log(FOO) // logs "BAR"
}
```

## Getting Azure Function App settings via CLI

Azure Function App settings can be retrieved via command line for local development/debugging.

Given a Azure Function App named "foobar", you'd retrieve app settings via command:

```
func azure functionapp fetch-app-settings foobar
```

## Running Azure Functions locally

Azure Functions can be run locally using command

```
func host start --debug vscode
```

**--debug vscode** is optional and used for debugging in Visual Studio Code. This is pretty powerful as it let's you set breakpoints and examine objects such as `context` and `req` being passed into each individual function.

When running the function you will be provded with an URL such as http://localhost:8080/api/FunctionName that you can execute calls against in local development whether through cURL or HTTP libraries in various frameworks. In PRODUCTION, you'll need to **whitelist** URL sources for CORS purposes to allow remote execution of Azure Functions. By default, only a few Azure specific URL sources can remotely trigger functions without CORS errors.

## Publishing Azure Function via CLI

Locally developed functions can be [published](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#publish) to Azure via command line.

Given a Azure Function App named "foobar", you'd publish functions in your local project using command:

```
func azure functionapp publish foobar
```