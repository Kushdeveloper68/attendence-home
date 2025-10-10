function roleCheckMiddleware(requiredRole) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== requiredRole) {
      return res.json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
}

module.exports = roleCheckMiddleware;