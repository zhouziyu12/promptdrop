"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-alchemy/useScaffoldWriteContract";
import { useClient } from "~~/hooks/scaffold-alchemy/useClient";

export default function PromptMint() {
  const { address } = useClient();
  const isConnected = !!address;
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync, isLoading } = useScaffoldWriteContract("PromptNFT");

  const handleMint = async () => {
    try {
      setIsMinting(true);
      const tx = await writeContractAsync({
        functionName: "mintPromptNFT",
        args: [],
      });
      setTxHash(tx);
    } catch (error) {
      console.error("Mint Error:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  return (
    <div className="p-4 rounded-2xl shadow bg-white text-center max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">🧠 Mint your PromptNFT</h1>

      {!isConnected && <p className="text-red-500">Please connect your wallet first.</p>}

      {isConnected && (
        <button
          onClick={handleMint}
          disabled={isMinting || isLoading || isSuccess}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isMinting || isLoading
            ? "Minting..."
            : isSuccess
            ? "✅ Minted"
            : "Mint NFT"}
        </button>
      )}

      {txHash && (
        <div className="mt-4 text-sm text-gray-500">
          Tx:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
}
