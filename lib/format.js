function snakecaseName(name) {
    return name.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');
}

module.exports = {
    snakecaseName
}