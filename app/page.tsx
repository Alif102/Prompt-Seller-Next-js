"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
// import Hero from './components/Layout/Homepage/Hero'
// import About from './components/Layout/Homepage/About'
import Image from 'next/image'
//  import { User } from '@clerk/nextjs/server'
import axios from 'axios'
import { Divider } from "@nextui-org/react"
import { styles } from "../app/utils/styles";
import Loader from './utils/Loader/Loader'
import PromptCardLoader from './utils/PromptCardLoader'
import PromptCard from './components/Prompts/PromptCard'
import Future from './components/Layout/Future'
import Footer from './components/Layout/Footer'

type Props = {
  // user: User | undefined;
  // isSellerExist: boolean | undefined;
  
}

const Page = ({}: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isSellerExist, setisSellerExist] = useState(false);
  const [prompts, setPrompts] = useState<any>();


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

  const fetchPromptsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-prompts`);
      const data = await response.json();
      setPrompts(data.prompts);
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromptsData();
  }, []);

  

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
           {/* <About />  */}

           <div>
            <h1 className={`${styles.heading} p-2 font-Monserrat`}>
              Latest Prompts
            </h1>
            <div className="w-full flex flex-wrap mt-5">
              
                  {prompts &&
                    prompts.map((item: any) => (
                      <PromptCard prompt={item} key={item.id} />
                    ))}
                
            </div>
           
          </div>
          <br />
            <Future/>
            
            <br />
            <br/>
            <Divider className="bg-[#ffffff23]" />
            <Footer/>
     

    </div>
    </div>
    )}
    
   
   </>
  )
}

export default Page












// import React from "react";
// // import { getUser } from "@/actions/user/getUser";
// import RoutePage from "./_page";
// import { getUser } from "../actions/user/getUser";

// const Page = async () => {
//   const data = await getUser();
 
//   return (
//     <div>
//       <RoutePage
//         user={data?.user}
//         isSellerExist={data?.shop ? true : false}
//       />
//     </div>
//   );
// };

// export default Page;