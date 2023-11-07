const sendMail = require("./sendMail");
const sendForm = async (req, res) => {
  const { body } = req;

  const verifyEmail = {
    to: "osz77263@zslsz.com",
    subject: "Новый клиент оставил в модалке свои данные!",
    html: ` 
    Имя: ${body.name}<br/>
    Номер телефона: ${body.phone}<br/>
    Email: ${body.email}<br/>
    Сообщение: ${body.message}
    `,
  };
  await sendMail(verifyEmail);
  res.status(200).json(verifyEmail);
};
module.exports = sendForm;
