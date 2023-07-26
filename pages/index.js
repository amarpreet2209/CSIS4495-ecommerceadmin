import Layout from "@/components/Layout";
import {useSession} from "next-auth/react";
import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";

export default function Home() {
    return (
        <Layout>
            <HomeHeader/>
            <HomeStats/>
        </Layout>
    )
}
