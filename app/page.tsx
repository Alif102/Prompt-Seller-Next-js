"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
// import Hero from './components/Layout/Homepage/Hero'
import About from './components/Layout/Homepage/About'
import Image from 'next/image'
// import { User } from '@clerk/nextjs/server'
import axios from 'axios'
import Loader from './utils/Loader/Loader'

type Props = {
  // user: User | undefined;
  // isSellerExist: boolean | undefined;
}

const Page = ({ }: Props) => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isSellerExist, setisSellerExist] = useState(false);


  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

 

  useEffect(()=> {
    setLoading(true);
    axios.get("/api/me").then(res=> {

      setUser(res.data.user)
      setisSellerExist(res.data.shop ? true : false)
      setLoading(false)

    }).catch((error)=> {
      console.log(error)
      setLoading(false)
    })
  },[])

  if (!isMounted) {
    return null;
  }
  return (
   <>
   {
    loading ? (
      <Loader/>

    ) : (
      <div>
      <div className="banner">
      <Header user={user} activeItem={0} isSellerExist={isSellerExist} />
      {/* <Hero/> */}
      </div>

      <Image
          src={"https://pixner.net/aikeu/assets/images/footer/shape-two.png"}
          width={120}
          height={120}
          alt=""
          className="absolute right-[-30px]"
        />
        <br />
        <div className="w-[95%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto">
           <About /> 
          </div>
     

    </div>
    )
   }
   </>
  )
}

export default Page