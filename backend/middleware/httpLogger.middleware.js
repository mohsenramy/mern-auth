import logger from "../config/winstonLogger.js";

const httpLogger = (req, res, next) => {
  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(new Buffer.from(chunk));

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(new Buffer.from(chunk));

    let body = Buffer.concat(chunks).toString("utf8");

    if (body) body = JSON.parse(body);

    oldEnd.apply(res, arguments);
    console.log(req.headers);
    logger.http(
      `\t HTTP:: [ ${req.method}: [${req.path} ] - (${res.statusCode})`,
      {
        fromIP: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        contentType: req.headers["content-type"],
        status: res.statusCode,
        method: req.method,
        originalUri: req.originalUrl,
        uri: req.url,
        requestData: req.body,
        responseData: body,
        referer: req.headers.referer || "",
        ua: req.headers["user-agent"],
      }
    );
  };
  next();
};

// export default httpLogger;
export default httpLogger;
