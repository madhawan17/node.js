const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version not found",
    });
  }
};

const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-version") === version) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version not found",
    });
  }
};

const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");

  if (
    contentType &&
    contentType.includes(`application/vnd.api.v${version}+json`)
  ) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version not found",
    });
  }
};

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning };
