"use client";

import Footer from "@/app/components/Layout/Footer";
import Header from "@/app/components/Layout/Header";
import ShopBanner from "@/app/components/Shop/ShopBanner";
import { User } from "@clerk/nextjs/server";
import { Divider, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import FilterPrompt from "@/app/components/Prompts/FilterPrompts";
import { useRouter } from "next/navigation";
import PromptCard from "@/app/components/Prompts/PromptCard";
import PromptCardLoader from "@/app/utils/PromptCardLoader";
import axios from "axios";

const MarketPlaceRouter = () => {
    const [user, setUser] = useState(null);
    const [isMounted, setisMounted] = useState(false);
    const [isSellerExist, setisSellerExist] = useState(false);
  const [initialPage, setInitialPage] = useState(1);
  const [prompts, setPrompts] = useState<any>();
  const [totalPrompts, setTotalPrompts] = useState<any>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
      const response = await fetch(`/api/get-prompts?page=${initialPage}`);
      const data = await response.json();
      setPrompts(data.prompts);
      setTotalPrompts(data.totalPrompts);
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted) {
      setisMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (initialPage) {
      router.push(`/marketplace?page=${initialPage}`);
    }
  }, [initialPage, router]);

  useEffect(() => {
    fetchPromptsData();
  }, [initialPage]);

  if (!isMounted) {
    return null;
  }

  const paginationsPages = totalPrompts && Math.ceil(totalPrompts.length / 8);

  return (
    <>
      <div className="shop-banner">
        <Header activeItem={2} user={user} isSellerExist={isSellerExist} />
        <ShopBanner title="Our Shop" />
      </div>
      <div>
        <div className="w-[95%] md:w-[90%] xl:w-[85%] 2xl:w-[80%] m-auto">
          <div>
            <div className="w-full">
              <FilterPrompt
                setPrompts={setPrompts}
                totalPrompts={totalPrompts}
              />
            </div>
            <div className="w-full flex flex-wrap mt-5">
              {loading ? (
                [...new Array(8)].map((i) => (
                  <>
                    <PromptCardLoader />
                  </>
                ))
              ) : (
                <>
                  {prompts &&
                    prompts.map((item: any) => (
                      <PromptCard prompt={item} key={item.id} />
                    ))}
                </>
              )}
            </div>
            <div className="w-full flex items-center justify-center mt-5">
              {!loading && (
                <Pagination
                  loop
                  showControls
                  total={paginationsPages}
                  initialPage={initialPage}
                  classNames={{
                    wrapper: "mx-2",
                    item: "mx-2",
                  }}
                  onChange={setInitialPage}
                />
              )}
            </div>
            <Divider className="bg-[#ffffff14] mt-5" />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceRouter;