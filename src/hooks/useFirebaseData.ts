import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { storage, firestore } from "@/config/firebase";
import { CheckInData } from "@/types/CheckInsTypes";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Custom hook to manage Firebase data
const useFirebaseData = (collectionName: string) => {
  const [checkIns, setCheckIns] = useState<CheckInData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Firebase
  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(firestore, collectionName)
      );
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Ensure this returns the expected structure
      })) as CheckInData[];

      setCheckIns(dataArray); // Update state with fetched data
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data: ", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a document in the collection
  const updateData = async (id: string, updatedData: Partial<CheckInData>) => {
    setLoading(true);

    try {
      const itemRef = doc(firestore, collectionName, id);
      await updateDoc(itemRef, updatedData);
      setCheckIns((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
    } catch (err) {
      setError("Error updating document");
      console.error("Error updating document:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadData = async (metadata: Partial<CheckInData>, file: File) => {
    setLoading(true);
    try {
      let fileURL = "";
      if (file) {
        const uniqueFileName = `${Date.now()}_${file.name}`;
        const fileRef = ref(storage, `images/${uniqueFileName}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }

      const avatarPath = "/assets/JohnDoe.png";
      const response = await fetch(avatarPath);
      const blob = await response.blob();
      const uniqueAvatarName = `JohnDoe_${Date.now()}.png`;
      const avatarRef = ref(storage, `images/${uniqueAvatarName}`);
      await uploadBytes(avatarRef, blob);
      const avatarURL = await getDownloadURL(avatarRef);

      // Generate bookingId and bookDate
      const bookingId = new Date().getTime();
      const bookDate = new Date().toISOString();

      // Create a new document in Firestore with a unique ID
      const docRef = doc(collection(firestore, collectionName));
      await setDoc(docRef, {
        ...metadata,
        imageUrl: fileURL,
        avatarUrl: avatarURL,
        bookingId,
        bookDate,
        name: "John Doe",
        createdAt: new Date().toISOString(),
      });

      await fetchData(); // Refresh data after upload
    } catch (err) {
      setError("Error uploading data");
      console.error("Error uploading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [collectionName]);

  useEffect(() => {
    console.log("Updated checkIns:", checkIns);
  }, [checkIns]);

  return { checkIns, loading, error, updateData, uploadData };
};

export default useFirebaseData;
