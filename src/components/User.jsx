import React from "react";

const User = ({ user }) => {
  return (
    
    <div>
      <div className="card m-3 " >
        <img src={user.avatar_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{user.login}</h5>
          <p className="card-text">

          </p>
          <a href={user.html_url} class="btn btn-primary">
                Go Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default User;
