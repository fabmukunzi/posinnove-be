import UserProfile from '../database/models/defaultModel';

export const getAllExpertiseAndInterests = async (req, res) => {
  try {
    const profiles = await UserProfile.findAll({
      attributes: ['expertise', 'interests'],
    });

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({
        message: 'No expertise or interests found',
      });
    }

    const allExpertise = profiles.map(profile => profile.expertise).flat();
    const allInterests = profiles.map(profile => profile.interests).flat();

    return res.status(200).json({
      message: 'Expertise and interests retrieved successfully',
      data: {
        expertise: allExpertise,
        interests: allInterests,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve expertise and interests',
      error: error.message,
    });
  }
};
