"use client"
// import { getUser } from "@/actions/user/getUser";
import PromptDetailsPage from "./_page";
import { stripePublishableKey } from "@/actions/payment/PaymentAction";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: any }) => {
  // const data = await getUser();
  const publishAbleKey = stripePublishableKey()!;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isSellerExist, setisSellerExist] = useState(false);

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

  return (
    <div>
      <PromptDetailsPage
        user={user}
        isSellerExist={isSellerExist}
        publishAbleKey={publishAbleKey}
        promptId={params.id}
      />
    </div>
  );
};

export default Page;
