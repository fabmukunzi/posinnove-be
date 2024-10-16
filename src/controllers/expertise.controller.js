import Expertise from '../database/models/expertise.model'
import User from '../database/models/user.model'

export const UpsertExpertise = async (req, res) => {
  try {
    const { expertiseNames } = req.body
    const userId = req.user.id

    const [expertise, created] = await Expertise.findOrCreate({
      where: { userId },
      defaults: { expertiseNames },
    })

    if (!created) {
      expertise.expertiseNames = expertiseNames
      await expertise.save()
    }

    return res.status(201).json({
      message: created
        ? 'Expertise added successfully'
        : 'Expertise updated successfully',
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to add/update expertise',
      error: error.message,
    })
  }
}

export const getExpertise = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Expertise,
          as: 'userExpertises',
        },
      ],
    })

    if (!user || !user.userExpertises || user.userExpertises.length === 0) {
      return res
        .status(404)
        .json({ message: 'No expertise found for this user' })
    }

    return res.status(200).json({
      message: 'Expertise retrieved successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        expertise: user.userExpertises[0].expertiseNames,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Failed to retrieve expertise',
      error: error.message,
    })
  }
}
