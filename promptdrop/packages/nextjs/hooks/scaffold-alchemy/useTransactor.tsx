import { useEffect, useState } from "react";
import { useChain } from "@account-kit/react";
import { getPublicClient } from "@wagmi/core";
import { Hash, TransactionReceipt } from "viem";
import { Config } from "wagmi";
import { SendTransactionMutate } from "wagmi/query";
import { config } from "~~/account.config";
import scaffoldConfig from "~~/scaffold.config";
import { getBlockExplorerTxLink, getParsedError, notification } from "~~/utils/scaffold-alchemy";
import { TransactorFuncOptions } from "~~/utils/scaffold-alchemy/contract";

type TransactionFunc = (
  tx: (() => Promise<Hash>) | Parameters<SendTransactionMutate<Config, undefined>>[0],
  options?: TransactorFuncOptions,
) => Promise<Hash | undefined>;

/**
 * Custom notification content for TXs.
 */
const TxnNotification = ({ message, blockExplorerLink }: { message: string; blockExplorerLink?: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (blockExplorerLink || !scaffoldConfig.expectedUserOpTime) return;

    const startTime = Date.now();
    const duration = scaffoldConfig.expectedUserOpTime;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min((elapsed / duration) * 100, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [blockExplorerLink]);

  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {!blockExplorerLink && <progress className="progress progress-success w-full my-2" value={progress} max="100" />}
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a href={blockExplorerLink} target="_blank" rel="noreferrer" className="block link text-md">
          check out transaction
        </a>
      ) : null}
    </div>
  );
};

/**
 * Runs Transaction passed in to returned function showing UI feedback.
 * @param _walletClient - Optional wallet client to use. If not provided, will use the one from useWalletClient.
 * @returns function that takes in transaction function as callback, shows UI feedback for transaction and returns a promise of the transaction hash
 */
export const useTransactor = (): TransactionFunc => {
  const { chain } = useChain();

  const result: TransactionFunc = async (tx, options) => {
    let notificationId = null;
    let transactionHash: Hash | undefined = undefined;
    let transactionReceipt: TransactionReceipt | undefined;
    let blockExplorerTxURL = "";
    try {
      const network = chain.id;
      // Get full transaction from public client
      const publicClient = getPublicClient(config._internal.wagmiConfig);

      notificationId = notification.loading(<TxnNotification message="Sending transaction..." />);
      if (typeof tx === "function") {
        // Tx is already prepared by the caller
        const result = await tx();
        transactionHash = result;
      } else if (tx != null) {
        // TODO: change this into send user operation if we're going to use this
        transactionHash = "0xabc...";
        // transactionHash = await client.sendTransaction(tx as SendTransactionParameters);
      } else {
        throw new Error("Incorrect transaction passed to transactor");
      }
      notification.remove(notificationId);

      blockExplorerTxURL = network ? getBlockExplorerTxLink(network, transactionHash) : "";

      notificationId = notification.loading(
        <TxnNotification message="Waiting for transaction to complete." blockExplorerLink={blockExplorerTxURL} />,
      );

      transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: options?.blockConfirmations,
      });
      notification.remove(notificationId);

      if (transactionReceipt.status === "reverted") throw new Error("Transaction reverted");

      notification.success(
        <TxnNotification message="Transaction completed successfully!" blockExplorerLink={blockExplorerTxURL} />,
        {
          icon: "🎉",
        },
      );

      if (options?.onBlockConfirmation) options.onBlockConfirmation(transactionReceipt);
    } catch (error: any) {
      if (notificationId) {
        notification.remove(notificationId);
      }
      console.error("⚡️ ~ file: useTransactor.ts ~ error", error);
      const message = getParsedError(error);

      // if receipt was reverted, show notification with block explorer link and return error
      if (transactionReceipt?.status === "reverted") {
        notification.error(<TxnNotification message={message} blockExplorerLink={blockExplorerTxURL} />);
        throw error;
      }

      notification.error(message);
      throw error;
    }

    return transactionHash;
  };

  return result;
};
