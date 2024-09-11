import { useState } from "react";
import { Servico } from "../../api/Types";
import { servicoService } from "../../api/services/servicoService";

interface EditModalProps {
  user: { idArtista: number }; // Define the props to pass user info
}

export const EditModal = ({ user }: EditModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentServico, setCurrentServico] = useState<Partial<Servico>>({});

  const openModal = (servico?: Servico) => {
    setIsEdit(!!servico);
    setCurrentServico(servico || {});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentServico({});
  };

  const handleCreateOrEdit = async () => {
    try {
      const servicoToSubmit: Omit<Servico, "id_servico"> = {
        ...currentServico,
        id_artista: user.idArtista, // Ensure this is set
        descricao: currentServico.descricao || "", // Ensure description is set
        valor_servico: currentServico.valor_servico || 0, // Ensure valor_servico is set
      };

      if (isEdit && currentServico.id_servico) {
        // Update service
        await servicoService.updateServico(
          currentServico.id_servico,
          servicoToSubmit
        );
      } else {
        // Create new service
        await servicoService.createServico(servicoToSubmit);
      }

      closeModal(); // Close modal after successful save
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Editar Serviço" : "Criar Serviço"}</h2>
      <input
        type="text"
        placeholder="Descrição"
        value={currentServico.descricao || ""}
        onChange={(e) =>
          setCurrentServico({ ...currentServico, descricao: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Preço"
        value={currentServico.valor_servico || 0}
        onChange={(e) =>
          setCurrentServico({
            ...currentServico,
            valor_servico: parseFloat(e.target.value),
          })
        }
      />
      <button onClick={handleCreateOrEdit}>
        {isEdit ? "Salvar" : "Criar"}
      </button>
      <button onClick={closeModal}>Cancelar</button>
    </div>
  );
};
