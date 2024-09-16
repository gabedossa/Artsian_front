import { useEffect, useState } from "react";
import { Boxtitle } from "../boxtitle/BoxTitle";
import { Pedido } from "../../api/Types";
import { pedidoService } from "../../api/services/pedidoService";

interface CardPedidoProps {
  idCliente: number;  // Corrigido para idCliente
}

export const CardPedidoUser: React.FC<CardPedidoProps> = ( { idCliente } ) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [workingStatus, setWorkingStatus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchPedidos = async () => {
      console.log(idCliente);
      try {
        // Buscar todos os pedidos do cliente
        const pedidosData = await pedidoService.getPedidosPorIdCliente(idCliente);  
        setPedidos(pedidosData);
        console.log(pedidosData);

        // Inicializa o estado workingStatus para cada pedido
        const initialStatus = pedidosData.reduce((acc: any, pedido: Pedido) => {
          acc[pedido.id_pedido] = pedido.trabalhando || false;
          return acc;
        }, {});
        setWorkingStatus(initialStatus);
      } catch (error) {
        setError("Erro ao buscar pedidos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (idCliente) {
      fetchPedidos();
    }
  }, [idCliente]);

  const toggleWorkingStatus = async (id_pedido: number) => {
    const newStatus = !workingStatus[id_pedido];
    
    // Atualiza o estado local
    setWorkingStatus((prevStatus) => ({
      ...prevStatus,
      [id_pedido]: newStatus,
    }));

    try {
      await pedidoService.updatePedido(id_pedido, { trabalhando: newStatus });
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido no banco de dados:", error);
      setError("Erro ao atualizar o status do pedido.");
    }
  };

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cardPedido">
      <Boxtitle Title="Pedidos" />
      <div className="pedidoLista">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id_pedido} className="pedidoItem">
              <p>#ID: {pedido.id_pedido} -- </p>
              <p>Descrição: {pedido.descricao}</p>
            </div>
          ))
        ) : (
          <div className="pedidoItem">
            <p>Você não possui nenhum pedido ainda...</p>
          </div>
        )}
      </div>
    </div>
  );
};
