import axios from 'axios';
import { useEffect } from 'react';
import Theme from '../../components/Theme';

const Profile = () => {
  //     useEffect(()=>{
  //         axios.get(`https://ya-praktikum.tech/api/v2/auth/user`)
  //         .then((response: any) => {
  //           const user = response;
  //           localStorage.setItem("userId", user.id)
  // console.log(response)
  //         })
  //     },[])
  return (
    <>
      <h2>Профиль username</h2>
      <div>аватар</div>
      <div>
        <div>key</div>
        <div>value</div>
      </div>
      <Theme />
    </>
  );
};
export default Profile;
