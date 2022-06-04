import ReactDOM from 'react-dom';

type BackDropProps = {
  onClose: () => void;
};
const Backdrop: React.FC<BackDropProps> = (props) => {
  return (
    <div
      className={
        'absolute w-full h-screen z-40 bg-cyan-900 opacity-70 overflow-auto'
      }
      onClick={props.onClose}
    />
  );
};

type OverlayProps = {
  children: React.ReactNode;
};
const ModalOverlay: React.FC<OverlayProps> = (props) => {
  return (
    <div
      className={
        'fixed top-12 left-12 w-11/12 h-5/6 bg-slate-900 p-10 rounded-3xl shadow-lg z-50 overflow-y-scroll'
      }
    >
      <div>{props.children}</div>
    </div>
  );
};

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};
const Modal: React.FC<ModalProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const portalElement = document.getElementById('overlays')!;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
