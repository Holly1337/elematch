import imageFireBlue1 from '../assets/images/cards/fire-blue-1-full.png'
import imageFireBlue2 from '../assets/images/cards/fire-blue-2-full.png'
import imageFireBlue3 from '../assets/images/cards/fire-blue-3-full.png'
import imageFireRed1 from '../assets/images/cards/fire-red-1-full.png'
import imageFireRed2 from '../assets/images/cards/fire-red-2-full.png'
import imageFireRed3 from '../assets/images/cards/fire-red-3-full.png'
import imageFireYellow1 from '../assets/images/cards/fire-yellow-1-full.png'
import imageFireYellow2 from '../assets/images/cards/fire-yellow-2-full.png'
import imageFireYellow3 from '../assets/images/cards/fire-yellow-3-full.png'
import imageEnergyBlue1 from '../assets/images/cards/energy-blue-1-full.png'
import imageEnergyBlue2 from '../assets/images/cards/energy-blue-2-full.png'
import imageEnergyBlue3 from '../assets/images/cards/energy-blue-3-full.png'
import imageEnergyRed1 from '../assets/images/cards/energy-red-1-full.png'
import imageEnergyRed2 from '../assets/images/cards/energy-red-2-full.png'
import imageEnergyRed3 from '../assets/images/cards/energy-red-3-full.png'
import imageEnergyYellow1 from '../assets/images/cards/energy-yellow-1-full.png'
import imageEnergyYellow2 from '../assets/images/cards/energy-yellow-2-full.png'
import imageEnergyYellow3 from '../assets/images/cards/energy-yellow-3-full.png'
import imageWaterBlue1 from '../assets/images/cards/water-blue-1-full.png'
import imageWaterBlue2 from '../assets/images/cards/water-blue-2-full.png'
import imageWaterBlue3 from '../assets/images/cards/water-blue-3-full.png'
import imageWaterRed1 from '../assets/images/cards/water-red-1-full.png'
import imageWaterRed2 from '../assets/images/cards/water-red-2-full.png'
import imageWaterRed3 from '../assets/images/cards/water-red-3-full.png'
import imageWaterYellow1 from '../assets/images/cards/water-yellow-1-full.png'
import imageWaterYellow2 from '../assets/images/cards/water-yellow-2-full.png'
import imageWaterYellow3 from '../assets/images/cards/water-yellow-3-full.png'

export const CARD_IMAGES = {
  imageFireBlue1,
  imageFireBlue2,
  imageFireBlue3,
  imageFireRed1,
  imageFireRed2,
  imageFireRed3,
  imageFireYellow1,
  imageFireYellow2,
  imageFireYellow3,
  imageEnergyBlue1,
  imageEnergyBlue2,
  imageEnergyBlue3,
  imageEnergyRed1,
  imageEnergyRed2,
  imageEnergyRed3,
  imageEnergyYellow1,
  imageEnergyYellow2,
  imageEnergyYellow3,
  imageWaterBlue1,
  imageWaterBlue2,
  imageWaterBlue3,
  imageWaterRed1,
  imageWaterRed2,
  imageWaterRed3,
  imageWaterYellow1,
  imageWaterYellow2,
  imageWaterYellow3,
}

export const getImageForCard = (card: ElementCard) => {
  const attribute = `image${card.element}${card.color}${card.amount}`
  console.log(attribute)
  // @ts-ignore
  return CARD_IMAGES[attribute]
}
