const Access = require("../models/accessModel");
const User = require("../models/userModel");
const Theme = require("../models/themesModel");

const isAllow = async (req, res) => {
  const { email, productId } = req.body;

  try {
    // Find the user
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    // Find the theme
    const findTheme = await Theme.findById({ _id: productId });
    if (!findTheme) {
      return res.status(404).json({ error: "Theme Not Found" });
    }

    //  if there is
    const isThere = await Access.findOne({
      productId: findTheme._id,
      userId: findUser._id,
    });

    if (!isThere) {
      const createAcc = new Access({
        productId: findTheme._id,
        userId: findUser._id,
        permissionOne: false,
      });
      await createAcc.save();
      await User.findByIdAndUpdate(
        { _id: findUser._id },
        { $push: { Permission: createAcc.productId }, new: true }
      );
      return res.status(200).json({ accessTime: 30 });
    }

    // Update permissions
    if (
      isThere.permissionOne === false &&
      isThere.permissionTwo === true &&
      isThere.permissionThree === true
    ) {
      await Access.findByIdAndUpdate(isThere._id, {
        $set: { permissionTwo: false },
        new: true,
      });
      return res.status(200).json({ accessTime: 15 });
    }

    if (
      isThere.permissionOne === false &&
      isThere.permissionTwo === false &&
      isThere.permissionThree === true
    ) {
      await Access.findByIdAndUpdate(isThere._id, {
        $set: { permissionThree: false },
        new: true,
      });
      return res.status(200).json({ accessTime: 5 });
    }

    return res.status(200).json({ message: "Time Over" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", reason: error.message });
  }
};

module.exports = { isAllow };
