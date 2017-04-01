'use strict';

export const getBoardsAndOrganizations = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      data: {
        error: req.err
      }
    });
  } else {
    return res.status(200).json({
      data: {
        boards: user.boards,
        organizations: user.organizations,
        starredBoards: user.boardStars
      }
    });
	}
};