export const handleNotFound = (res, objects) => {
    for (const [key, value] of Object.entries(objects)) {
      if (!value) {
        return res.status(404).json({
          status: 'error',
          error: `${key} not found`
        });
      }
    }
}

export const handleBadRequest = (res, objects) => {
    for (const [key, value] of Object.entries(objects)) {
      if (value === null || value === undefined) {
        return res.status(400).json({
          status: 'error',
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
  
export const handleUnauthorized = (res, message = "Unauthorized request") => {
  return res.status(401).json({
    status: 'error',
    message
  })
}

export const handleForbidden = (res, message = "Forbidden") => {
  return res.status(403).json({
    status: 'error',
    message
  })
}