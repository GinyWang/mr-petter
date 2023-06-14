import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import VideoCarousel from "./videoCarousel";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { REGION, S3_BUCKET_NAME } from "../../constants";

export default function VideoScreen({ credentials }) {
  const [videoUrls, setVideoUrls] = useState([]); // [ { title: string, uri: string }

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const s3Client = new S3Client({
          region: REGION,
          credentials: credentials,
        });
        // Fetch the list of objects in the S3 bucket
        const listObjectsCommand = new ListObjectsCommand({
          Bucket: S3_BUCKET_NAME,
          Prefix: "interaction/",
        });
        const { Contents } = await s3Client.send(listObjectsCommand);

        // Filter the objects to include only .mp4 files
        const mp4Files = Contents.filter((object) =>
          object.Key.endsWith(".mp4")
        );

        // Sort the files by LastModified in descending order
        // @ts-ignore
        mp4Files.sort((a, b) => b.LastModified - a.LastModified);

        // Get the URLs of the recent 5 videos
        const recentVideos = mp4Files.slice(0, 5).map((file) => ({
          title: file.Key.split("/").pop(),
          uri: `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${file.Key}`,
        }));

        setVideoUrls(recentVideos);
      } catch (error) {
        console.error("Error fetching video URLs:", error);
      }
    };

    fetchVideoUrls();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <VideoCarousel videoUrls={videoUrls} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
});
