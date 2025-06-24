import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CartItem } from '../types';
import colors from '../theme/color';

interface Props {
    item: CartItem;
    onRemove: (id: string) => void;
}

const CartItemCard = React.memo(({ item, onRemove }: Props) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: `https://picsum.photos/seed/${item.id}/200/120` }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.item} >
              <View>
                <Text style={styles.itemText}>
                    {item?.name} × {item?.qty}
                </Text>
                <Text style={styles.priceText}>₹ {item?.qty * item?.price}</Text>
                {!item?.inStock && (
                    <Text style={styles.outOfStock}>Out of Stock</Text>
                )}
              </View>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onRemove(item?.id)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default CartItemCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 10,
        padding: 4,
        paddingHorizontal: 8,
        marginBottom: 12,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    image: {
        width: '25%',
        height: 65,
        borderRadius: 10,
        margin: 4,
    },
    item: {
        width: '68%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 8
    },
    itemText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    priceText: {
        fontSize: 14,
        color: colors.muted,
        marginBottom: 8,
    },
    outOfStock: {
        color: colors.danger,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    removeButton: {
        backgroundColor: colors.danger,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    removeButtonText: {
        color: colors.white,
        fontWeight: '600',
    },
});
