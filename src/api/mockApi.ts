import { Product } from '../types';


const imagePool = [
  'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg',
];

const rawProducts = [
  { id: '1', name: 'Apple', price: 100, isInStock: 0 },
  { id: '2', name: 'Banana', price: 50, isInStock: 1 },
  { id: '3', name: 'Orange', price: 80, isInStock: 0 },
  { id: '4', name: 'Kiwi', price: 120, isInStock: 1 },
  { id: '5', name: 'Mango', price: 150, isInStock: 1 },
  { id: '7', name: 'Potato', price: 50, isInStock: 1 },
  { id: '11', name: 'Grapes', price: 90, isInStock: 1 },
  { id: '12', name: 'Strawberry', price: 200, isInStock: 0 },
  { id: '13', name: 'Blueberry', price: 220, isInStock: 1 },
  { id: '14', name: 'Watermelon', price: 70, isInStock: 1 },
  { id: '15', name: 'Guava', price: 60, isInStock: 1 },
  { id: '16', name: 'Peach', price: 130, isInStock: 0 },
  { id: '17', name: 'Pineapple', price: 110, isInStock: 1 },
  { id: '18', name: 'Tomato', price: 30, isInStock: 1 },
  { id: '19', name: 'Cucumber', price: 45, isInStock: 0 },
  { id: '20', name: 'Carrot', price: 40, isInStock: 1 },
  { id: '21', name: 'Lettuce', price: 35, isInStock: 1 },
  { id: '22', name: 'Spinach', price: 25, isInStock: 0 },
  { id: '23', name: 'Cabbage', price: 30, isInStock: 1 },
  { id: '24', name: 'Coriander', price: 15, isInStock: 1 },
  { id: '25', name: 'Garlic', price: 20, isInStock: 1 },
  { id: '26', name: 'Ginger', price: 25, isInStock: 1 },
  { id: '27', name: 'Broccoli', price: 75, isInStock: 0 },
  { id: '28', name: 'Cauliflower', price: 50, isInStock: 1 },
  { id: '29', name: 'Sweet Corn', price: 55, isInStock: 1 },
  { id: '30', name: 'Radish', price: 35, isInStock: 0 },
  { id: '31', name: 'Pumpkin', price: 65, isInStock: 1 },
  { id: '32', name: 'Bitter Gourd', price: 60, isInStock: 1 },
  { id: '33', name: 'Bottle Gourd', price: 45, isInStock: 0 },
  { id: '34', name: 'Zucchini', price: 90, isInStock: 1 },
  { id: '35', name: 'Mushroom', price: 85, isInStock: 1 },
  { id: '36', name: 'Beetroot', price: 50, isInStock: 0 },
  { id: '37', name: 'Turnip', price: 55, isInStock: 1 },
  { id: '38', name: 'Okra', price: 40, isInStock: 1 },
  { id: '39', name: 'Brinjal', price: 35, isInStock: 1 },
  { id: '40', name: 'Peas', price: 60, isInStock: 0 },
  { id: '41', name: 'Avocado', price: 160, isInStock: 1 },
  { id: '42', name: 'Dragon Fruit', price: 180, isInStock: 0 },
  { id: '43', name: 'Lychee', price: 140, isInStock: 1 },
  { id: '44', name: 'Jackfruit', price: 95, isInStock: 1 },
  { id: '45', name: 'Custard Apple', price: 110, isInStock: 0 },
  { id: '46', name: 'Pomegranate', price: 130, isInStock: 1 },
  { id: '47', name: 'Sapota', price: 90, isInStock: 1 },
  { id: '48', name: 'Tamarind', price: 55, isInStock: 1 },
  { id: '49', name: 'Raspberry', price: 210, isInStock: 0 },
  { id: '50', name: 'Blackberry', price: 200, isInStock: 1 },
];

export const fetchProducts = async (p: { pageParam: unknown }): Promise<Product[]> => {
  return rawProducts.map((product, index) => ({
    ...product,
    image: imagePool[index % imagePool.length],
  }));
};

export const fetchRelatedProducts = async (): Promise<Product[]> => [
  { id: '4', name: 'Kiwi', price: 120, isInStock: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg' },
  { id: '5', name: 'Mango', price: 150, isInStock: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg' },
  { id: '1', name: 'Apple', price: 100, isInStock: 0,image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpgs' },
  { id: '2', name: 'Banana', price: 50, isInStock: 1 ,image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg' },
  { id: '3', name: 'Orange', price: 80, isInStock: 0 ,image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg' },
  
];
