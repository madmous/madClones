export const buildResponse = (statusCode, data, res) => {
  if (statusCode === 200) {
    return res.status(200).json({
      data
    })
  } else {
    return res.status(statusCode).json({
      data: {
        uiError: data
      }
    })
  }
};