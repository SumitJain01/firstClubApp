import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../theme/color";

interface OutOfStockModalProps {
  visible: boolean;
  items: string[];
  onClose: () => void;
  onRemoveAll: () => void;
}

const OutOfStockModal: React.FC<OutOfStockModalProps> = ({
  visible,
  items,
  onClose,
  onRemoveAll,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>⚠️ Items Out of Stock</Text>
          <Text style={styles.description}>
            {items.join(", ")} {items?.length > 1 ? "are" : "is"} out of stock.
            Please remove {items?.length > 1 ? "them" : "it"} to proceed.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.removeButton]}
              onPress={onRemoveAll}
            >
              <Text style={styles.removeText}>Remove All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OutOfStockModal;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: width * 0.85,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  removeButton: {
    backgroundColor: colors.danger || "#ff4d4f",
  },
  removeText: {
    color: colors.white,
    fontWeight: "600",
  },
  okText: {
    color: colors.white,
    fontWeight: "600",
  },
});
