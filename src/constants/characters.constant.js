import ASSETS_PATH from "./assetsPath.constant.js";

const CHARACTERS_CONFIG = {
    NINJA_GREEN: {
        Faceset: `${ASSETS_PATH.Characters}/NinjaGreen/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/NinjaGreen/SpriteSheet.png`,
        Color: Color.new(86, 134, 76),
        Name: `GREEN.NINJA`,
        Price: 500
    },
    PIG: {
        Faceset: `${ASSETS_PATH.Characters}/Pig/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Pig/SpriteSheet.png`,
        Color: Color.new(242, 173, 125),
        Name: "PIGGY",
        Price: 600

    },
    SKELETON: {
        Faceset: `${ASSETS_PATH.Characters}/Skeleton/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Skeleton/SpriteSheet.png`,
        Color: Color.new(242, 234, 241),
        Name: "SKELETON",
        Price: 1250
    },
    SPIRIT: {
        Faceset: `${ASSETS_PATH.Characters}/Spirit/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Spirit/SpriteSheet.png`,
        Color: Color.new(121, 184, 206),
        Name: "SPIRIT",
        Price: 1500
    },
    NINJA_RED: {
        Faceset: `${ASSETS_PATH.Characters}/NinjaRed2/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/NinjaRed2/SpriteSheet.png`,
        Color: Color.new(224, 57, 76),
        Name: `RED.NINJA`,
        Price: 500
    },
    TENGU: {
        Faceset: `${ASSETS_PATH.Characters}/Tengu/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Tengu/SpriteSheet.png`,
        Color: Color.new(143, 62, 86),
        Name: `TENGU`,
        Price: 500
    },
}

export default CHARACTERS_CONFIG