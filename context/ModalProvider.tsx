import React, { createContext, useState, ReactNode } from 'react';
import ConfirmModal from '../components/ModalConfirm';


interface ModalContextProps {
  showModal: (onConfirm?: () => void, customChildren?: ReactNode) => void;
  hideModal: () => void;
 
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [modalChildren, setModalChildren] = useState<ReactNode | undefined>(undefined);

  const showModal = (onConfirmCallback?: () => void, customChildren?: ReactNode) => {
    setModalChildren(customChildren);
    setOnConfirm(() => onConfirmCallback);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalChildren(undefined);
    setOnConfirm(undefined);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal}}>
      {children}
      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={hideModal}
      >
        {modalChildren}
      </ConfirmModal>
    </ModalContext.Provider>
  );
};