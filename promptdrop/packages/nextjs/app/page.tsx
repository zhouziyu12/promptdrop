"use client";

import Link from "next/link";
import { useAuthModal } from "@account-kit/react";
import type { NextPage } from "next";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { CounterUI } from "~~/components/counter/CounterUI";
import { Address } from "~~/components/scaffold-alchemy";
import { useClient } from "~~/hooks/scaffold-alchemy/useClient";
import PromptMint from "~~/components/PromptMint";



const Home: NextPage = () => {
  const { address } = useClient();
  const { openAuthModal } = useAuthModal();
  const isConnected = !!address;

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-Alchemy</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            {isConnected ? (
              <>
                <p className="my-2 font-medium">Connected Address:</p>
                <Address address={address} />
              </>
            ) : (
              <button className="btn btn-primary my-4" onClick={openAuthModal}>
                Login and do stuff onchain!
              </button>
            )}
          </div>

          {isConnected && (
            <>
              <div className="mt-8 mb-8">
                <CounterUI />
              </div>

              {/* ✅ Mint NFT 按钮组件 */}
              <div className="mt-8 mb-8">
                <PromptMint />
              </div>
            </>
          )}

          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              Counter.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
