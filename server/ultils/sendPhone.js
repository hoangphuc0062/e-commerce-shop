var https = require("follow-redirects").https;

const sendSMS = async (phone, messages) => {
  var options = {
    method: "POST",
    hostname: "z3jpwk.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App 7e307caf72c960f3f9c20833a3194c72-40dcd703-bf08-4c5c-8da0-e37597476b91",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    messages: [
      {
        destinations: [{ to: "84" + phone }],
        from: "Shop Điện máy",
        text: messages,
      },
    ],
  });

  req.write(postData);
  req.end();
};

module.exports = sendSMS;
