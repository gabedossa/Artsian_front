import { useEffect, useState } from "react";
import { Boxtitle } from "../boxtitle/BoxTitle";
import "./cardPedido.css";
import { Pedido } from "../../api/Types";
import { pedidoService } from "../../api/services/pedidoService";
export const CardPedido = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosData = await pedidoService.getPedidos();
        setPedidos(pedidosData);
      } catch (error) {
        setError("Erro ao buscar pedidos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cardPedido">
      <Boxtitle Title="Pedidos" />
      <div className="pedidoLista">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id_pedido} className="pedidoItem">
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
