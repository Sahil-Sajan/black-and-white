import { del } from "@vercel/blob";

/**
 * Deletes an image from Vercel Blob storage.
 * @param url The public URL of the blob to delete.
 */
export async function deleteBlob(url: string | null) {
  if (!url || !url.includes("public.blob.vercel-storage.com")) {
    return;
  }

  try {
    await del(url);
    console.log(`Blob deleted: ${url}`);
  } catch (error) {
    console.error(`Failed to delete blob: ${url}`, error);
  }
}

/**
 * Deletes multiple images from Vercel Blob storage.
 * @param urls Array of public URLs to delete.
 */
export async function deleteBlobs(urls: (string | null)[]) {
  const validUrls = urls.filter(url => url && url.includes("public.blob.vercel-storage.com")) as string[];
  
  if (validUrls.length === 0) return;

  try {
    await del(validUrls);
    console.log(`Blobs deleted: ${validUrls.length} items`);
  } catch (error) {
    console.error(`Failed to delete blobs`, error);
  }
}
