import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Force reflow
        void modalRef.current.offsetHeight;
        modalRef.current.classList.add('fr-modal--opened');
      } else {
        modalRef.current.classList.remove('fr-modal--opened');
        document.body.style.overflow = '';
        const onTransitionEnd = () => {
          if (modalRef.current) {
            modalRef.current.style.display = 'none';
          }
        };
        modalRef.current.addEventListener('transitionend', onTransitionEnd, { once: true });
      }
    }
  }, [isOpen]);

  return (
    <div 
      className="fr-modal" 
      ref={modalRef}
      role="dialog" 
      id="fr-modal-1" 
      aria-labelledby="fr-modal-1-title"
      style={{ display: 'none' }}
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button 
                  className="fr-btn--close fr-btn" 
                  title="Fermer la fenêtre modale"
                  onClick={onClose}
                  type="button"
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-1-title" className="fr-modal__title">
                  {title}
                </h1>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
