export const handleNotFound = (res, objects) => {
    for (const [key, value] of Object.entries(objects)) {
      if (!value) {
        return res.status(404).json({
          status: 'fail',
          error: `${key} not found`
        });
      }
    }
}

export const handleBadRequest = (res, objects) => {
    for (const [key, value] of Object.entries(objects)) {
      if (value === null || value === undefined) {
        return res.status(400).json({
          status: 'fail',
          error: `${key} is required`
        });
      }
    }
  };
  
export const handleInternalServerError = (res, error) => {
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred',
      error: error.message || 'Unexpected error'
    });
  };
  