import Smartphones from '../models/Categories/Smartphones';
import Smartphone from '../models/Goods/Smartphone';
import Tablet from '../models/Goods/Tablet';
import Laptop from '../models/Goods/Laptop';
import GameConsole from '../models/Goods/Game-console';

async function getCategoriesGoods() {
  try {
    const data = await Smartphones
    .find()
    .populate({path: 'goods', model: Smartphone})
    .populate({path: 'goods', model: Tablet})
    .populate({path: 'goods', model: Laptop})
    .populate({path: 'goods', model: GameConsole});

    return JSON.stringify(data);

  } catch {
    return null;
  }
}

export default getCategoriesGoods;
