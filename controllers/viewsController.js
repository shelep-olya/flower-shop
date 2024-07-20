exports.getMainPage = (req, res) => {
    res.status(200).render("index");
};

exports.getContactPage = (req, res) => {
    res.status(200).render("contact");
}

exports.getAboutPage = (req, res) => {
    res.status(200).render("about")
}

exports.getProductsPage = (req, res) => {
    res.status(200).render("products")
}

exports.getReviewPage = (req, res) => {
    res.status(200).render("review");
}