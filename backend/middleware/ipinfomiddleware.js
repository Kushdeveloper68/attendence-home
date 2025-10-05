const ipInfo = require('ipinfo');


const ipInfoMiddleware = async (req, res, next) => {
  try {
   ipInfo((err, cLoc) => {
    console.log(err || cLoc)

    // { ip: "94. ... .77",
    //   hostname: "... .com",
    //   city: "...",
    //   region: "England",
    //   country: "GB",
    //   loc: "5...,3...",
    //   org: "... UK Limited",
    //   postal: "..." }

    req.ipInfo = cLoc;
    next();
  });
  } catch (error) {
    console.error('Error fetching IP info:', error);
    next();
  }
};

module.exports = ipInfoMiddleware;