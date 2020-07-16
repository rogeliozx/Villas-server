const Recorder = require('node-rtsp-recorder').Recorder;
const nodemailer = require('nodemailer');
const moment = require('moment');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const fs = require('fs');
const Visits = require('../models/Visits');
const Seccions = require('../models/Seccions');
const Users = require('../models/Users');

const registerVisit = async (req, res) => {
  const { codeHouse, reason, section } = req.body;
  try {
    const haveTheUser = await existUser(section, codeHouse);
    if (haveTheUser) {
      const picture = {
        ine: await takePicture(codeHouse, new Date().getFullYear(), 2),
        ife: await takePicture(codeHouse, new Date().getFullYear(), 1),
      };
      if (picture.ine && picture.ife) {
        const data = await Visits.create({
          user_id: codeHouse,
          reason,
          user: codeHouse,
          picture,
        });
        const { email } = await getEmail(codeHouse);
        if (email) {
          sendEmail(email, picture, codeHouse);
        }
        return res.status(200).json({
          succes: true,
          register: data,
          picture,
        });
      }
      return res.status(500).json({
        succes: false,
        message: 'Error al tomar foto',
      });
    }
    return res.status(404).json({
      succes: false,
      error: 'Usuario no existente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      error,
    });
  }
};

const getAllNameSections = async (req, res) => {
  try {
    const data = await Seccions.find({}, { _id: 0, name: 1 });
    res.status(200).json({
      succes: true,
     sections: data,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error,
    });
  }
};

const getAllCodeSections = async (req, res) => {
  const { section } = req.query;
  try {
    const containsUser = await Seccions.findOne({
      name: section,
    }).select('users');
    return res.status(200).json({
      succes: true,
      users: containsUser.users,
    });
  } catch (error) {
    return res.status(404).json({
      succes: false,
      error: 'La seccion no se encuentra disponible o no existe',
    });
  }
};

const takePicture = async (codeHouse, year, numberCam) => {
  const rec = new Recorder({
    url: `rtsp://rogelio:rogelio123@192.168.100.190:554/cam/realmonitor?channel=${numberCam}&subtype=0`,
    folder: './image',
    name: `${codeHouse}`,
    type: 'image',
    directoryPathFormat: `${year}`,
    fileNameFormat: `YYYY-M-D-h-mm-ss`,
  });
  const image = await rec.captureImage(async (file) => {
    console.log(await file);
    console.log('finished');
  });
  return image;
};

const existUser = async (section, codeHouse) => {
  try {
    const containsUser = await Seccions.findOne({
      name: section,
      users: { $in: [codeHouse] },
    });
    if (containsUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const getImage = (req, res) => {
  const { image } = req.query;
  const locateImage = path.join(__dirname, '../' + image);

  if (image) {
    if (fs.existsSync(locateImage)) {
      return res.sendFile(path.resolve(locateImage));
    }
    return res.status(404).send({
      message: 'no existe la imagen',
    });
  } else {
    return res.status(505).send({
      message: 'error',
    });
  }
};
const sendEmail = async (email, picture, codeHouse) => {
  const template = await getTemplate();

  /* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rogelioltz@gmail.com',
      pass: 'Mercy0123!',
    },
  }); */
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'b63a862a806a1d',
      pass: 'ced59202d80ab2',
    },
  });
  const mailOptions = {
    from: 'villas.security-dd49f2@inbox.mailtrap.io',
    to: `${email}`,
    subject: 'Visita a su Domicilio',
    text: `Codigo: ${codeHouse}\n Fecha: ${moment().format(
      'MMMM Do YYYY, h:mm:ss a'
    )}`,
    html: template,
    attachments: [
      {
        filename: 'ine.png',
        path: picture.ine,
      },
      {
        filename: 'face.png',
        path: picture.ife,
      },
    ],
  };
  transporter.sendMail(mailOptions, (err, info) => {
    mailOptions.html = template;
    if (err) {
      console.log('Error');
      console.log(err);
    } else {
      console.log('se envio');
    }
  });
};

const getTemplate = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`views/index.handlebars`, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(data.toString());
    });
  });
};

const getEmail = async (codeHouse) => {
  try {
    const emailUser = await Users.findOne({
      User_id: codeHouse,
    });
    if (emailUser) {
      return emailUser;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  takePicture,
  getAllNameSections,
  registerVisit,
  getImage,
  getAllCodeSections,
};
