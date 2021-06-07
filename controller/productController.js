const fs = require("fs");
const headertemp = fs.readFileSync(
  `${__dirname}/../public/templates/headertemplate.html`,
  "utf-8"
);
const home = fs.readFileSync(`${__dirname}/../public/src/index.html`, "utf-8");
const headtemp = fs.readFileSync(
  `${__dirname}/../public/templates/headTemplate.html`,
  "utf-8"
);
const dress = fs.readFileSync(`${__dirname}/../public/src/dress.html`, "utf-8");
const footertemp = fs.readFileSync(
  `${__dirname}/../public/templates/footerTemplate.html`,
  "utf-8"
);
const electronics = fs.readFileSync(
  `${__dirname}/../public/src/Electronics.html`,
  "utf-8"
);
const furniture = fs.readFileSync(
  `${__dirname}/../public/src/Furniture.html`,
  "utf-8"
);
const gadgets = fs.readFileSync(
  `${__dirname}/../public/src/Gadgets.html`,
  "utf-8"
);

const replaceTemplate = (template, header, head, footer) => {
  let output = template.replace(/{%HEADER%}/g, header);
  output = output.replace(/{%HEAD%}/g, head);
  output = output.replace(/{%FOOTER%}/g, footer);
  return output;
};

// Controllers

exports.home = (req, res) => {
  const result = replaceTemplate(home, headertemp, headtemp, footertemp);
  res.end(result);
};

exports.dress = (req, res) => {
  const result = replaceTemplate(dress, headertemp, headtemp, footertemp);
  res.end(result);
};
exports.electronics = (req, res) => {
  const result = replaceTemplate(electronics, headertemp, headtemp, footertemp);
  res.end(result);
};

exports.furniture = (req, res) => {
  const result = replaceTemplate(furniture, headertemp, headtemp, footertemp);
  res.end(result);
};

exports.gadgets = (req, res) => {
  const result = replaceTemplate(gadgets, headertemp, headtemp, footertemp);
  res.end(result);
};
