import React, { useEffect, useState } from "react";
import { arteService } from "../../api/services/arteService";
import { portfolioService } from "../../api/services/portfolioService";
import { Arte, Portfolio } from "../../api/Types";
import { Boxtitle } from "../boxtitle/BoxTitle";

interface CardPortfolioProps {
  id: number; // Passe o idArtista como props para buscar o portfólio relacionado ao artista
}

export const CardPortfolio: React.FC<CardPortfolioProps> = ({ id }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null); // Um único portfólio
  const [artes, setArtes] = useState<Arte[]>([]); // Artes associadas ao portfólio
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar o portfólio e as artes associadas pela API
  const fetchPortfolio = async () => {
    try {
      // Obtém o portfólio do artista pelo id do artista
      const portfolioData = await portfolioService.getPortifolioByArtista(id);
      setPortfolio(portfolioData);

      if (portfolioData && portfolioData.id_portfolio) {
        // Agora busca as artes associadas ao id do portfólio
        const artesData = await arteService.getArtesByPortifolio(portfolioData.id_portfolio);
        setArtes(artesData);
      } else {
        console.error("Erro: id_portfolio está indefinido.");
      }
    } catch (error) {
      setError("Erro ao buscar o portfólio e as artes. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  if (loading) return <p>Carregando portfólio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cardPortfolio">
      <Boxtitle Title="Portfólio" />
      {portfolio ? (
        <div className="portfolioDetalhes">
          <h3>{portfolio.titulo}</h3>
          <p>{portfolio.descricao}</p>
          <div className="artesLista">
            {artes.length > 0 ? (
              artes.map((arte) => (
                <div key={arte.id_arte} className="arteItem">
                  <h4>{arte.titulo}</h4>
                  <p>{arte.descricao}</p>
                  {/* Aqui exibimos a imagem da arte, se existir */}
                  {arte.caminho_imagem ? (
                    <img src={arte.caminho_imagem} alt={arte.titulo} className="arteImagem" />
                  ) : (
                    <p>Sem imagem disponível</p>
                  )}
                </div>
              ))
            ) : (
              <p>Este portfólio não possui nenhuma arte ainda...</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Você não possui nenhum portfólio ainda...</p>
          <button onClick={() => {}}>Criar Portfólio</button>
        </div>
      )}
    </div>
  );
};
