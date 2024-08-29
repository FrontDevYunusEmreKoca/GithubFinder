import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import Search from './components/Search';
import Users from './components/Users';
import axios from 'axios';
import Alert from './components/Alert';
import ClearButtons from './components/ClearButtons';


function App() {
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // Alert mesajını saklamak için state

  const searchUsers = (keyword) => {
    if (keyword.trim() === "") {
      setAlertMessage("Lütfen bir isim giriniz."); // Alert mesajını ayarla
      setLoading(false);
       // Eğer boşsa, yüklenmeyi de kapat
      setUsers([]); // Kullanıcıları temizle
      return; // Fonksiyonun geri kalanını çalıştırma
     }

     setLoading(true);
     setAlertMessage(""); // Alert mesajını sıfırla
     setClear(true)

    setTimeout(() => {
      axios
        .get(`https://api.github.com/search/users?q=${keyword}`)
        .then((res) => {
          setUsers(res.data.items); // Gelen kullanıcı verilerini güncelle
          setLoading(false); // Arama işlemi tamamlandıktan sonra yüklenmeyi kapat
          document.getElementById("inputValue").value = ""; // Giriş alanını temizle
          console.log("Başarıyla kullanıcılar alındı."); // Başarı mesajını konsola yazdır
          
  
        })
        .catch((err) => {
          console.error("Bir hata oluştu:", err); // Hata durumunda konsola hata yazdır
          setLoading(false); // Hata durumunda da yüklenmeyi kapat
        });
    }, 2000); // 2000 milisaniye (2 saniye) gecikme
  };
  const clearBtn = () => {
    setUsers([]);
    setClear(false)
  };
  return (
    <div className="App">
      <Header />
      {loading && <Loading />} {/* Yüklenme durumuna göre Loading bileşenini gösterin */}
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage("")} />} {/* Alert bileşeni */}
      <Search searchUsers={searchUsers} />
      {clear && <ClearButtons  clearBtn={clearBtn}/>} {/* Yüklenme durumuna göre Loading bileşenini gösterin */}
     
      <Users users={users} />
    </div>
  );
}

export default App;
