import { BlobServiceClient, ContainerClient, BlockBlobClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING: string | undefined = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Please define AZURE_STORAGE_CONNECTION_STRING in .env");
}

const blobServiceClient: BlobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

export async function uploadToBlob(containerName: string, file: Buffer | Uint8Array | Blob | ArrayBuffer, fileName: string): Promise<string> {
  const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.uploadData(file);

  return blockBlobClient.url; // Save this in MongoDB
}
