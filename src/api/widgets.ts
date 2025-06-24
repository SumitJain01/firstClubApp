import { WidgetConfig } from '../types';
import { fetchRelatedProducts } from './mockApi';

export const fetchWidgets = async (): Promise<WidgetConfig[]> => {
  const related = await fetchRelatedProducts();
  return [
    {
      id: 'widget-1',
      type: 'payment-offer',
      payload: { title: 'Extra 10% off on Prepaid Orders!', backgroundColor: '#4CAF50' },
    },
    {
      id: 'widget-2',
      type: 'promo-banner',
      payload: { title: '50% Off on Mangoes!', backgroundColor: 'orange' },
    },
    {
      id: 'widget-3',
      type: 'promo-banner',
      payload: { title: '60% Off on Potatoes!', backgroundColor: 'orange' },
    },
    {
      id: 'widget-4',
      type: 'related-products',
      payload: related,
    }
  ];
};
