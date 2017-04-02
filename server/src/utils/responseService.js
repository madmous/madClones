export const buildResponse = (statusCode, data, res) => {
  if (statusCode === 200) {
    return res.status(200).json({
      data: {
        boards: data.boards,
        organizations: data.organizations,
        starredBoards: data.boardStars
      }
    })
  } else {
    return res.status(statusCode).json({
      error: data
    })
  }
};