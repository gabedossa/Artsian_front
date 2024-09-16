// src/component/CardPedidosArtista/CardPedidosArtista.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";


interface Pedido {
  id: number;
  descricao: string;
  status: string;
  valor: number;
}

interface CardPedidosArtistaProps {
  idArtista: number;
}

export const CardPedidosArtista: React.FC<CardPedidosArtistaProps> = ({ idArtista }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar pedidos do artista
  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/pedidos/artista/${idArtista}`); // Ajuste a URL conforme necessário
      setPedidos(response.data);
    } catch (err) {
      setError("Erro ao buscar pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, [idArtista]);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cardPedidosArtista">
      <h3>Pedidos Recebidos</h3>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedidoCard">
            <p>Descrição: {pedido.descricao}</p>
            <p>Valor: R$ {pedido.valor.toFixed(2)}</p>
            <p>Status: {pedido.status}</p>
          </div>
        ))
      ) : (
        <p>Nenhum pedido recebido ainda.</p>
      )}
    </div>
  );
};
