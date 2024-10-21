import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = ()=>{
  const {user} = useAuthContext();
  const [userDetail,setUserDetail] = useState({});
  useEffect(()=>{
    const fetchUser = async()=>{
      const response = await fetch('/api/user/'+user.email,{
        headers:{'Authorization':`Bearer ${user.token}`}
      })
      const json = await response.json()
      if(response.ok)
      {
        console.log(json)
        setUserDetail(json)
      }
    }
    if(user)
    {
      fetchUser()
    }

  },[user])

  return(
    <div className="profile-container">
     {userDetail && 
     <>
     <p>{userDetail.email}</p>
     <p>{userDetail.mobile}</p>
     <p>Successfully logged in!!</p>
     </>
     }
    </div>
  )
}

export default Profile;