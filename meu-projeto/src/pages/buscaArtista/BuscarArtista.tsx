import { Link } from "react-router-dom";
import { TopNavBar } from "../../component/TopNavBar/TopNavBar";
import './BuscarArtistaStyle.css';
import { CardBuscaArtista } from "../../component/CardBuscaArtista/CardBuscaArtista";

export const BuscaArtista = () => {
  return (
    <div>
      <TopNavBar/>
      <div className="background">
        <div className="container">
        <div className="BuscaArtistaArea">
          <input className="searchArea" type="text" id="buscaPorNome" />
          <button className="buscaBTN">Buscar</button>
        </div>
        <CardBuscaArtista/>
        </div>
      </div>
    </div>
  );
};
