import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import './PedidoFormStyle.css';

interface PedidoFormProps {
  idArtista: number;
  idCliente: number;
}

export const PedidoForm: React.FC<PedidoFormProps> = ({ idArtista, idCliente }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dtPedido, setDtPedido] = useState<Date | null>(new Date());  // Inicializa com a data atual
  const [dtPrevisaoEntrega, setDtPrevisaoEntrega] = useState<Date | null>(null);  // Para o campo de data de entrega
  const [entregue, setEntregue] = useState(false);
  const [trabalhando, setTrabalhando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Função para enviar o pedido para a API
  const handleEnviar = async () => {
    if (!titulo || !descricao || !dtPedido || !dtPrevisaoEntrega) {
      setError("Preencha todos os campos.");
      return;
    }

    // Formata as datas usando date-fns para o formato ISO 8601 esperado
    const formattedDtPedido = format(dtPedido, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedDtPrevisaoEntrega = format(dtPrevisaoEntrega, "yyyy-MM-dd'T'HH:mm:ss");

    const novoPedido = {
      titulo,
      descricao,
      idCliente,
      idArtista,
      dt_pedido: formattedDtPedido,
      dt_previsao_entrega: formattedDtPrevisaoEntrega,
      entregue,
      trabalhando,
    };

    try {
      console.log("Enviando pedido:", novoPedido);
      await axios.post("http://localhost:8080/api/pedido/create", novoPedido); // Substitua a URL com o seu endpoint correto
      setSuccess("Pedido enviado com sucesso!");
      setError(null);
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);
      setError("Erro ao enviar pedido. Tente novamente.");
      setSuccess(null);
    }
  };

  return (
    <div className="pedidoCardForm">
      <div className="row">
        <input
          className="inputPlace"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          className="inputPlace"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          className="inputPlace"
          type="datetime-local"
          value={dtPedido ? format(dtPedido, "yyyy-MM-dd'T'HH:mm:ss") : ""}
          onChange={(e) => setDtPedido(new Date(e.target.value))}
        />
        <input
          className="inputPlace"
          type="datetime-local"
          value={dtPrevisaoEntrega ? format(dtPrevisaoEntrega, "yyyy-MM-dd'T'HH:mm:ss") : ""}
          onChange={(e) => setDtPrevisaoEntrega(new Date(e.target.value))}
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};
