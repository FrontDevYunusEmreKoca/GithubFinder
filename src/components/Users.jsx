import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from './User';
import Loading from './Loading'; // Loading bileşenini import ettik

const Users = ({users}) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true); // Başlangıçta loading true

  // useEffect(() => {
  //   // Veri çekme işlemi
  //   setTimeout(()=>{
  //       axios
  //       .get("https://api.github.com/users")
  //       .then(res => {
  //         setUsers(res.data);
  //         setLoading(false); // Veri alındıktan sonra loading false
  //       })
  //       .catch(() => {
  //         setLoading(false); // Hata durumunda da loading false
  //       })
  //   },3000);
  // }, []);

  // if (loading) {
  //   return <Loading />; // Eğer loading true ise Loading bileşenini göster
  // }

  return (
    <div className="container">
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4 col-lg-3 col-sm-6">
            <User user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
