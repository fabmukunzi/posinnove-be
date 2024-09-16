import Interest from "../database/models/interests.model";
export const AddInterests = async (req, res) => {
  try {
    const { interestNames } = req.body;
    const userId = req.user.id; 

    const newInterests = await Interest.create({
      userId,
      interestNames, 
    });

    return res.status(201).json({ message: "Interests added successfully", newInterests });
  } catch (error) {
    return res.status(500).json({ 
        message: "Failed to add interests",
        error:error.message
    });
  }
};
export const UpdateInterests = async (req, res) => {
  try {
    const { interestNames } = req.body;
    const userId = req.user.id;
    const interest = await Interest.findOne({ where: { userId } });
    if (!interest) {
      return res.status(404).json({ message: "No interests found for this user" });
    }
    interest.name = interestNames;
    await interest.save();

    return res.status(200).json({ message: "Interests updated successfully", interest });
  } catch (error) {
    return res.status(500).json({ 
        message: "Failed to update interests",
         error 
        });
  }
};
export const getInterests = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const interests = await Interest.findOne({ where: { userId } });
    if (!interests) {
      return res.status(404).json({ message: "No interests found for this user" });
    }
    return res.status(200).json({ 
      message: "Interests retrieved successfully", 
      interests 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to retrieve interests", 
      error: error.message 
    });
  }
};
