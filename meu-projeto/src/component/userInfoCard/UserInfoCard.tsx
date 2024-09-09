export const UserInfoCard = (user : any) => {
    return(
        <div className='usuarioCard'>
          
        <div className="usuarioCard">
          <h1>Bem-vindo, {user.nome}</h1>
          <p>Logado como: {user.tipoUsuario}</p>
          <p>Descrição: {user.descricao}</p>
        </div>
      </div>

    );
}