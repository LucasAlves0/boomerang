import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Informação do usuário</h1>
            <button>Atualizar Perfil</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src=" "
                alt=""
              />
            </span>
            <span>
              Nome de usuário: <b>USCS PIM</b>
            </span>
            <span>
              E-mail: <b>uscspim@gmail.com</b>
            </span>
          </div>
          <div className="title">
            <h1>Minha lista</h1>
            <button>Criar novo anúncio</button>
          </div>
          <List />
          <div className="title">
            <h1>Salvar lista</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
