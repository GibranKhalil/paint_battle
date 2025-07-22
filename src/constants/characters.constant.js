import ASSETS_PATH from "./assetsPath.constant.js";

const CHARACTERS_CONFIG = {
    NINJA_GREEN: {
        Faceset: `${ASSETS_PATH.Characters}/NinjaGreen/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/NinjaGreen/SpriteSheet.png`,
        Color: Color.new(86, 134, 76),
        Name: "GREEN  NINJA"
    },
    PIG: {
        Faceset: `${ASSETS_PATH.Characters}/Pig/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Pig/SpriteSheet.png`,
        Color: Color.new(242, 173, 125),
        Name: "PIGGY"

    },
    SKELETON: {
        Faceset: `${ASSETS_PATH.Characters}/Skeleton/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Skeleton/SpriteSheet.png`,
        Color: Color.new(242, 234, 241),
        Name: "SKELETON"
    },
    SPIRIT: {
        Faceset: `${ASSETS_PATH.Characters}/Spirit/Faceset.png`,
        SpriteSheet: `${ASSETS_PATH.Characters}/Spirit/SpriteSheet.png`,
        Color: Color.new(121, 184, 206),
        Name: "SPIRIT"

    },
}

export default CHARACTERS_CONFIG