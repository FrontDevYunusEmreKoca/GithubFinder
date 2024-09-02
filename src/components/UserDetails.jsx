import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import '../css/userDetails.css'; // Stil dosyasını içeri aktar

const UserDetails = ({ getUser }) => {
    const { login } = useParams(); // URL'den 'login' parametresini alır
    const [user, setUser] = useState(null); // Kullanıcı verisini saklamak için state
    const [repos, setRepos] = useState([]); // Kullanıcının reposlarını saklamak için state
    const [loading, setLoading] = useState(true); // Yüklenme durumunu saklamak için state
    const [error, setError] = useState(null); // Hata durumunu saklamak için state
    const [showAllRepos, setShowAllRepos] = useState(false); // Tüm reposları gösterme durumu

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { user, repos } = await getUser(login); // Kullanıcı ve repos verilerini al
                setUser(user); // Kullanıcı verisini güncelle
                setRepos(repos); // Repos verisini güncelle
            } catch (err) {
                setError('Kullanıcı verisi veya repos verisi alınamadı.'); // Hata mesajını ayarla
                console.error(err); // Hata detaylarını konsola yazdır
            } finally {
                setLoading(false); // Yüklenme işlemini tamamla
            }
        };

        fetchUserDetails();
    }, [login, getUser]); // login veya getUser değiştiğinde verileri yeniden al

    if (loading) return <Loading />; // Yüklenme durumunda Loading bileşenini göster

    if (error) return <div className="error-message">{error}</div>; // Hata durumunda hata mesajını göster

    const displayedRepos = showAllRepos ? repos : repos.slice(0, 9); // Tüm veya ilk 9 repo göster

    return (
        <div className="container user-details">
            <div className="row">
                <div className="col-md-4 text-center">
                    <img
                        src={user?.avatar_url}
                        alt={`${user?.login} Avatar`}
                        className="user-avatar"
                    />
                    <h2 className="user-name">{user?.name || user?.login}</h2>
                    <div className="user-stats">
                        <span className="stat-item"><strong>Public Repos:</strong> {user?.public_repos}</span>
                        <span className="stat-item"><strong>Followers:</strong> {user?.followers}</span>
                        <span className="stat-item"><strong>Following:</strong> {user?.following}</span>
                    </div>
                    <p className="user-bio"><strong>Bio:</strong> {user?.bio || 'Bilgi mevcut değil'}</p>
                    <p className="user-location"><strong>Location:</strong> {user?.location || 'Bilgi mevcut değil'}</p>
                    <p className="user-email"><strong>Email:</strong> {user?.email || 'Bilgi mevcut değil'}</p>
                    <p className="user-created"><strong>Created At:</strong> {user ? new Date(user.created_at).toLocaleDateString() : ''}</p>
                    <p className="user-updated"><strong>Updated At:</strong> {user ? new Date(user.updated_at).toLocaleDateString() : ''}</p>
                    <a href={user?.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        GitHub Profiline Git
                    </a>
                </div>
                <div className="col-md-8">
                    <div className="repos mt-4">
                        <h3>Repositories:</h3>
                        <div className="repo-list">
                            {displayedRepos.map((repo) => (
                                <div key={repo.id} className="repo-card">
                                    <div className="repo-content">
                                        <h4 className="repo-name">{repo.name}</h4>
                                        <p className="repo-description">{repo.description || 'No description'}</p>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                            GitHub'da Görüntüle
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {repos.length > 9 && (
                            <button 
                                onClick={() => setShowAllRepos(!showAllRepos)}
                                className="btn btn-secondary mt-2"
                            >
                                {showAllRepos ? 'Geri Dön' : 'Daha Fazla Göster'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
