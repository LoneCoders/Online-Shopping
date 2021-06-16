const express = require('express');
const router = express.Router();

const fs = require('fs');
const headertemp = fs.readFileSync(
  `${__dirname}/../public/templates/headertemplate.html`,
  'utf-8'
);
const Home = fs.readFileSync(`${__dirname}/../public/src/index.html`, 'utf-8');
const headtemp = fs.readFileSync(
  `${__dirname}/../public/templates/headTemplate.html`,
  'utf-8'
);
const Dress = fs.readFileSync(`${__dirname}/../public/src/dress.html`, 'utf-8');
const footertemp = fs.readFileSync(
  `${__dirname}/../public/templates/footerTemplate.html`,
  'utf-8'
);
const Electronics = fs.readFileSync(
  `${__dirname}/../public/src/Electronics.html`,
  'utf-8'
);
const Furniture = fs.readFileSync(
  `${__dirname}/../public/src/Furniture.html`,
  'utf-8'
);
const Gadgets = fs.readFileSync(
  `${__dirname}/../public/src/Gadgets.html`,
  'utf-8'
);

const replaceTemplate = (template, header, head, footer) => {
  let output = template.replace(/{%HEADER%}/g, header);
  output = output.replace(/{%HEAD%}/g, head);
  output = output.replace(/{%FOOTER%}/g, footer);
  return output;
};

// Controllers

const home = (req, res) => {
  const result = replaceTemplate(Home, headertemp, headtemp, footertemp);
  res.end(result);
};

const dress = (req, res) => {
  const result = replaceTemplate(Dress, headertemp, headtemp, footertemp);
  res.end(result);
};
const electronics = (req, res) => {
  const result = replaceTemplate(Electronics, headertemp, headtemp, footertemp);
  res.end(result);
};

const furniture = (req, res) => {
  const result = replaceTemplate(Furniture, headertemp, headtemp, footertemp);
  res.end(result);
};

const gadgets = (req, res) => {
  const result = replaceTemplate(Gadgets, headertemp, headtemp, footertemp);
  res.end(result);
};

router.get('/home', home);

router.get('/dress', dress);

router.get('/electronics', electronics);

router.get('/furniture', furniture);

router.get('/gadgets', gadgets);

module.exports = router;
