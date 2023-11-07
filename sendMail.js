const { EMAILFROM, FORMODALKEY } = process.env;

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAILFROM,
    pass: FORMODALKEY,
  },
});
const sendEmail = async (body) => {
  const callback = function (error, data, response) {
    if (error) {
      console.error(error.message);
    } else {
      console.log("API called successfully.");
    }
  };

  transporter.sendMail(body, callback);
  return true;
};
module.exports = sendEmail;
