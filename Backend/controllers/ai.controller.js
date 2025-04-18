const AI = require("../config/googleapi");

module.exports.generateCode = async (req, res, next) => {
  const code = req.body.prompt;

  if (!code) {
    return res.status(400).json({
      msg: "Code is required",
    });
  }

  const response = await AI.main(code);
  res.status(200).send( response );
};
