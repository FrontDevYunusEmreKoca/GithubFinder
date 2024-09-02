import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import Search from './components/Search';
import Users from './components/Users';
import axios from 'axios';
import Alert from './components/Alert';
import ClearButtons from './components/ClearButtons';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import UserDetails from './components/UserDetails';



function App() {
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [users, setUsers] = useState([]);
  const [user,setUser] = useState({});
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
  const getUser = async (username) => {
    try {
      // Kullanıcı bilgilerini al
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      const user = userResponse.data;
  
      // Kullanıcının reposlarını al
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      const repos = reposResponse.data;
  
      return { user, repos }; // Kullanıcı ve repos verilerini döndür
    } catch (error) {
      console.error('Hata oluştu:', error);
      throw new Error('Kullanıcı verisi veya repos verisi alınamadı.');
    }
  };

 
  return (
    <BrowserRouter>
      <Header />
    
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage("")} />} {/* Alert bileşeni */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Fragment to wrap multiple components */}
              <Search searchUsers={searchUsers} />
              {loading && <Loading />} {/* Yüklenme durumuna göre Loading bileşenini gösterin */}
              {clear && <ClearButtons clearBtn={clearBtn} />} {/* Display ClearButtons conditionally */}
            
              <Users users={users} loading={loading}/>
            </>
          }
        />
        <Route 
          path='/user/:login' 
          element={<UserDetails getUser={getUser} loading={loading}/>}
        />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
