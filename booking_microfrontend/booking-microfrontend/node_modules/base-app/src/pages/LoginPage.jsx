import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LoginPage(){
  const [username,setUsername] = useState('');
  const [role,setRole] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(()=> {
    const q = searchParams.get('username');
    if(q) setUsername(q);
  },[searchParams]);

  const handle = () => {
    dispatch(setUser({username, role}));
    navigate('/home');
  };

  return (
    <div style={{padding:24}}>
      <h2>Login</h2>
      <input placeholder='username' value={username} onChange={e=>setUsername(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value='user'>user</option>
        <option value='admin'>admin</option>
      </select>
      <button onClick={handle}>Login</button>
    </div>
  );
}
