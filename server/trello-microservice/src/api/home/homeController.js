'use strict';

export const getBoardsAndOrganizations = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      data: {
        error: req.err
      }
    });
  } else {
    return res.status(200).json({
      data: {
        boards: user.boards,
        organizations: user.organizations,
        boardStars: user.boardStars
      }
    });
	}
};