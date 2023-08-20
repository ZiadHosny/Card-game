let imageId = -1

createCardObj = (svgName) => {

    imageId++;

    return {
        id: imageId,
        url: `url("images/${svgName}.svg")`
    }
}

const cards = [
    createCardObj("king"),
    createCardObj("joker"),
    createCardObj("ace"),
    createCardObj("j"),
    createCardObj("three"),
    createCardObj("seven"),
    createCardObj("q"),
    createCardObj("ten"),
    createCardObj("penguin"),
    createCardObj("teddybear"),
    createCardObj("eid"),
    createCardObj("alien"),
];
