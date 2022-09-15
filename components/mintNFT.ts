import * as anchor from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV2Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { SOLANA_VISION_WALLET } from "./constants";

export const mintNFT = async (wallet: WalletContextState, uri: string) => {
  if (wallet.publicKey === null || !wallet.signTransaction) return;
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const { blockhash } = await connection.getLatestBlockhash("finalized");
  const transaction = new anchor.web3.Transaction({
    recentBlockhash: blockhash,
    feePayer: wallet.publicKey,
  });

  const mintKey = anchor.web3.Keypair.generate();

  const lamports = await connection.getMinimumBalanceForRentExemption(
    MINT_SIZE
  );

  transaction.add(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey, // The account that will transfer lamports to the created account
      newAccountPubkey: mintKey.publicKey, // Public key of the created account
      space: MINT_SIZE, // Amount of space in bytes to allocate to the created account
      lamports, // Amount of lamports to transfer to the created account
      programId: TOKEN_PROGRAM_ID, // Public key of the program to assign as the owner of the created account
    }),
    createInitializeMintInstruction(
      mintKey.publicKey, // mint pubkey
      0, // decimals
      wallet.publicKey, // mint authority
      wallet.publicKey // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
    )
  );
  // ata stands for Associated Token Account
  let wallet_ata = await getAssociatedTokenAddress(
    mintKey.publicKey, // mint
    wallet.publicKey // owner
  );

  transaction.add(
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      wallet_ata,
      wallet.publicKey,
      mintKey.publicKey
    ),
    createMintToInstruction(
      mintKey.publicKey, // mint
      wallet_ata,
      wallet.publicKey,
      1
    )
  );

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  const [metadatakey] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintKey.publicKey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const [masterKey] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintKey.publicKey.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const data: DataV2 = {
    name: "Solana Vision",
    symbol: "SVSN",
    uri: uri,
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: wallet.publicKey,
        verified: true,
        share: 100,
      },
    ],
    collection: null,
    uses: null,
  };

  const args = {
    data,
    isMutable: true,
  };

  const createMetadataV2 = createCreateMetadataAccountV2Instruction(
    {
      metadata: metadatakey,
      mint: mintKey.publicKey,
      mintAuthority: wallet.publicKey,
      payer: wallet.publicKey,
      updateAuthority: wallet.publicKey,
    },
    {
      createMetadataAccountArgsV2: args,
    }
  );

  transaction.add(createMetadataV2);

  const createMasterEditionV3 = createCreateMasterEditionV3Instruction(
    {
      edition: masterKey,
      mint: mintKey.publicKey,
      updateAuthority: wallet.publicKey,
      mintAuthority: wallet.publicKey,
      payer: wallet.publicKey,
      metadata: metadatakey,
    },
    {
      createMasterEditionArgs: {
        maxSupply: new anchor.BN(0),
      },
    }
  );
  transaction.add(createMasterEditionV3);
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: SOLANA_VISION_WALLET,
      lamports: LAMPORTS_PER_SOL / 100, // 0.01 SOL network fee for revenue generation
    })
  );
  transaction.partialSign(mintKey);
  const signed_transaction = await wallet.signTransaction(transaction);
  const serialized_transaction = signed_transaction.serialize();
  const txid = await connection.sendRawTransaction(serialized_transaction);
  const confirmed = await connection.confirmTransaction(txid, 'processed');
  if (confirmed) return txid;
  throw new Error('Unable to confirm transaction');
};
