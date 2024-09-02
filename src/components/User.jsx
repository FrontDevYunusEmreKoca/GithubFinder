import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const User = ({ user}) => {
  return (
    <div>
      <div className="card my-3">
        <img src={user.avatar_url} className="card-img-top" alt="User Avatar" />
        <div className="card-body">
          <h5 className="card-title">{user.login}</h5>
          <p className="card-text">
            {/* Kullanıcı hakkında diğer bilgiler eklenebilir */}
          </p>
          {/* Doğru login parametresini kullanarak dinamik bir link oluşturun */}
          <Link to={`/user/${user.login}`} className="btn btn-primary">
             
            Go Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
