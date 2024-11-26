import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Color } from '../constants/Color';

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableOpacity style={styles.modalOverlay}  activeOpacity={1}>
        <View style={styles.modalContainer}>
          {children && <View style={styles.messageContainer}>{children}</View>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonConfirm} onPress={onConfirm}>
              <Text style={styles.buttonTextConfirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    elevation: 5,
  },
  messageContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonConfirm: {
  
    backgroundColor: Color.primaryColor,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonTextConfirm: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    backgroundColor:'black',
    padding:10,
    borderRadius:5
  },
});

export default ConfirmModal;