const notFound = (req, res) => res.status(404).send(`required route not found`)

module.exports = notFound;