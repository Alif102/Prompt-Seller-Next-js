"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
// import Hero from './components/Layout/Homepage/Hero'
import About from './components/Layout/Homepage/About'
import Image from 'next/image'
 import { User } from '@clerk/nextjs/server'
// import axios from 'axios'
import { styles } from "../app/utils/styles";
// import Loader from './utils/Loader/Loader'
// import PromptCardLoader from './utils/PromptCardLoader'
// import PromptCard from './components/Prompts/PromptCard'

type Props = {
  // user: User | undefined;
  // isSellerExist: boolean | undefined;
  user: User | undefined;
  isSellerExist: boolean | undefined;
}

const RoutePage = ({ user, isSellerExist}: Props) => {
    const [isMounted, setIsMounted] = useState(false);
  // const [prompts, setPrompts] = useState<any>();
  // const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

 

  

  if (!isMounted) {
    return null;
  }
  return (
   <>
  
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

           <div>
            <h1 className={`${styles.heading} p-2 font-Monserrat`}>
              Latest Prompts
            </h1>
            
            <br />
          </div>
     

    </div>
    </div>
    
   
   </>
  )
}

export default RoutePage