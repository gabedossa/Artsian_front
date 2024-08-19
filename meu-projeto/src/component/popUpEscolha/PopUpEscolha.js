import './PopUpEscolhaStyle.css';

export const PopupEscolha = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
      }
    
    return(
        <div className="modal-overlay">
      <div className="modal">
        <div className='modalHeader'>
        <h2>Confirmação</h2>
        <p>Você tem certeza que deseja excluir este artista?</p>
        </div>
        <div className="modal-buttons">
          <button className="positivo" onClick={onConfirm}>Sim</button>
          <button className="negativo" onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
    )
}