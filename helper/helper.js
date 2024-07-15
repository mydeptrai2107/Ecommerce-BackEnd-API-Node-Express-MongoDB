const resGenerator = (res, statusCode, apiStatus, massage, data) => {
  res.status(statusCode).send({
    apiStatus,
    massage,
    data,
  });
};

module.exports = {
  resGenerator,
};
