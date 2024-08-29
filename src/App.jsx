
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import Search from './components/Search';
import Users from './components/Users';
import axios from 'axios';

function App() {
  const [loading,setLoading] = useState(false);
  const [users,setUsers] = useState([]);

  const searchUsers =(keyword) =>{
    setLoading(true)
     setTimeout(() => {
    
      axios
        .get(`https://api.github.com/search/users?q=${keyword}`)
        .then((res) => {
          setUsers(res.data.items); // Gelen kullanıcı verilerini güncelle
          setLoading(false); // Arama işlemi tamamlandıktan sonra yüklenmeyi kapat
          document.getElementById("inputValue").value = ""
        })
        .catch((err) => {
          console.error(err); // Hata durumunu konsola yazdır
          setLoading(false); // Hata durumunda da yüklenmeyi kapat
        });
    }, 2000); // 2000 milisaniye (2 saniye) gecikme
  };
  
  return (
    <div className="App">
      <Header />
      {loading && <Loading />} {/* Yüklenme durumuna göre Loading bileşenini gösterin */}
      <Search searchUsers={searchUsers}/>
      <Users users={users} />
    
    </div>
  );
}

export default App;
