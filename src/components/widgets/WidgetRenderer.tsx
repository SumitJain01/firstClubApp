import React from 'react';
import { WidgetConfig } from '../../types';
import RelatedProducts from './RelatedProducts';
import PromoBanner from './PromoBanner';
import PaymentOffer from './PaymentOffer';

type Props = {
  widget: WidgetConfig;
};

export default function WidgetRenderer({ widget }: Props) {
  switch (widget?.type) {
    case 'promo-banner':
      return <PromoBanner {...widget?.payload} />;
    case 'payment-offer':
      return <PaymentOffer {...widget?.payload} />;
    case 'related-products':
      return <RelatedProducts products={widget?.payload} />;
    default:
      return null;
  }
}
