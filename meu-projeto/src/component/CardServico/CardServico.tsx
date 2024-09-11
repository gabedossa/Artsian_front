import React, { useEffect, useState } from "react";
import { Boxtitle } from "../boxtitle/BoxTitle";
import { servicoService } from "../../api/services/servicoService";
import { Servico } from "../../api/Types";
import { PopupEscolha } from "../popUpEscolha/PopUpEscolha"; // Verifique se o caminho está correto
import "./CardServico.css";

export const CardServico = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentServico, setCurrentServico] = useState<Partial<Servico>>({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [servicoToDelete, setServicoToDelete] = useState<number | null>(null);

  // Captura o id do artista do localStorage
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const idArtista: number = user?.idArtista || 1; 

  // Função para buscar os serviços da API
  const fetchServicos = async () => {
    try {
      const servicosData = await servicoService.getServicos();
      setServicos(servicosData);
    } catch (error) {
      setError("Erro ao buscar serviços. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  // Função para criar serviço
  const handleCreate = async () => {
    const servicoToCreate = {
      id_artista: user.idArtista,
      descricao: currentServico.descricao || "",
      valor_servico: currentServico.valor_servico || 0,
    };
    try {
      console.log("Enviando dados para criação:", servicoToCreate);
      await servicoService.createServico(servicoToCreate);
      await fetchServicos();
    } catch (error: any) {
      console.error("Erro ao criar serviço:", error.response?.data || error.message);
    } finally {
      closeModal();
    }
  };

  // Função para editar serviço
  const handleEdit = async () => {
    try {
      await servicoService.updateServico(currentServico.id_servico!, currentServico);
      await fetchServicos();
    } catch (error) {
      console.error("Erro ao editar serviço:", error);
    } finally {
      closeModal();
    }
  };

  // Função para abrir o modal de criação
  const openCreateModal = () => {
    setIsEdit(false);
    setCurrentServico({});
    setIsModalOpen(true);
  };

  // Função para abrir o modal de edição
  const openEditModal = (servico: Servico) => {
    setIsEdit(true);
    setCurrentServico(servico);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentServico({});
  };

  // Função para abrir o popup de confirmação de exclusão
  const openDeletePopup = (id_servico: number) => {
    setServicoToDelete(id_servico);
    setShowDeletePopup(true);
  };

  // Função para confirmar a exclusão
  const confirmDelete = async () => {
    try {
      if (servicoToDelete !== null) {
        await servicoService.deleteServico(servicoToDelete);
        await fetchServicos();
      }
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
    } finally {
      setShowDeletePopup(false);
      setServicoToDelete(null);
    }
  };

  if (loading) return <p>Carregando serviços...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="servicoCard">
      <Boxtitle Title="Serviços" />
        <div className="scroll">
            {servicos.length > 0 ? (
              servicos.map((servico) => (
                <div className="tableRow" key={servico.id_servico}>
                  <div className="tableData"><p>{servico.descricao}</p></div>
                  <div className="tableData"><p>R$ {servico.valor_servico.toFixed(2)}</p></div>
                  <div className="tableData">
                    <button className="" onClick={() => openEditModal(servico)}>Editar</button>
                    <button
                      className="cancelar"
                      onClick={() => openDeletePopup(servico.id_servico)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="contente">
                  Você não possui nenhum serviço oferecido ainda...
                </td>
              </tr>
            )}
        </div>

      {/* Botão para abrir o modal de criação */}
      <div className="createArea">
        <button className="criarServico" onClick={openCreateModal}>
          +Novo
        </button>
      </div>

      {/* Modal para criação ou edição de serviços */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>{isEdit ? "Editar Serviço" : "Criar Serviço"}</h2>
            <input
              type="text"
              placeholder="Descrição"
              value={currentServico.descricao || ""}
              onChange={(e) =>
                setCurrentServico({
                  ...currentServico,
                  descricao: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Preço"
              value={currentServico.valor_servico || ""}
              onChange={(e) =>
                setCurrentServico({
                  ...currentServico,
                  valor_servico: parseFloat(e.target.value),
                })
              }
            />
            <button onClick={isEdit ? handleEdit : handleCreate}>
              {isEdit ? "Salvar" : "Criar"}
            </button>
            <button className="cancelar" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Popup de confirmação de exclusão */}
      <PopupEscolha
        show={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
