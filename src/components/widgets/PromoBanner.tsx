import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  title: string;
  backgroundColor: string;
};

export default function PromoBanner({ title, backgroundColor }: Props) {
  return (
    <View style={{ paddingHorizontal: 16,paddingVertical: 8, backgroundColor, borderRadius: 8, marginTop: 16 }}>
      <Text style={{ fontSize: 14, color: 'white',fontWeight: 600 }}>{title}</Text>
    </View>
  );
}
