export interface ModalRefProps {
  isOpen: boolean;
  hide: () => void;
  show: (Component: JSX.Element, animationSlide?: 'fade' | 'slide') => void;
}

export interface ModalConfig {
  isOpen: boolean;
  animationPreset: 'fade' | 'slide';
}

type HookuseModalProps = {
  modalRef: React.RefObject<ModalRefProps>;
  setShowComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

export type ModalViewModel = (props: HookuseModalProps) => {
  configModal: ModalConfig;
  hide: () => void;
};
