import Interest from "../database/models/interests.model";
import User from "../database/models/user.model";

export const UpsertInterests = async (req, res) => {
  try {
    const { interestNames } = req.body;
    const userId = req.user.id;

    const [interest, created] = await Interest.findOrCreate({
      where: { userId },
      defaults: { interestNames }
    });

    if (!created) {
      interest.interestNames = interestNames;
      await interest.save();
    }

    return res.status(201).json({
      message: created ? "Interests added successfully" : "Interests updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add/update interests",
      error: error.message
    });
  }
};

export const getInterests = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Interest,
          as: 'userInterests'
        }
      ]
    });

    if (!user || !user.userInterests || user.userInterests.length === 0) {
      return res.status(404).json({ message: "No interests found for this user" });
    }

    return res.status(200).json({
      message: "Interests retrieved successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        interests: user.userInterests[0].interestNames
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to retrieve interests",
      error: error.message
    });
  }
};