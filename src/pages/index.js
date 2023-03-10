import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState();

  const apiKey = process.env.NEXT_PUBLIC_NASA_API;
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`;

  const getTechTransferData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info);
  };

  useEffect(() => {
    getTechTransferData();
  }, []);

  return (
    <>
      <Head>
        <title>NASA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/polychromatic"
          className="text-blue-600 underline hover:text-blue-800 font-bold mb-4 block text-center"
        >
          Polychromatic
        </Link>

        <div className="grid grid-cols-2 gap-4">
          {data &&
            data.results.map((tech, index) => {
              return (
                <div key={index} className="border rounded overflow-hidden">
                  {tech &&
                    tech.map((t, ind) => {
                      if (ind === 10) {
                        return (
                          <Image
                            src={t}
                            alt={t}
                            key={ind}
                            width={100}
                            height={100}
                            className="block mx-auto my-4"
                          />
                        );
                      }
                    })}
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
