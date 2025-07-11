/**
 * Formats filename from S3 key
 */
export const formatAttachmentName = (attachmentKey) => {
  if (typeof attachmentKey === "object" && attachmentKey?.key) {
    attachmentKey = attachmentKey.key;
  }

  if (typeof attachmentKey !== "string") {
    console.error("Invalid attachmentKey: Expected a string", attachmentKey);
    return "Unknown Attachment";
  }

  try {
    // Get the filename from the path
    const filename = attachmentKey.split("/").pop() || attachmentKey;

    // Remove timestamp prefix (pattern: numbers_filename.ext)
    const timestampPattern = /^\d+_(.+)$/;
    const match = filename.match(timestampPattern);

    return match ? match[1] : filename;
  } catch (error) {
    console.error("Error formatting attachmentKey", { attachmentKey, error });
    return "Unknown Attachment";
  }
};
