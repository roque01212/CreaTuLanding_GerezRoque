import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Product } from "../type/product";
import { BuyOrder } from "../type/order";
import { products } from "../data/product";

export const getProducts = async (): Promise<Product[]> => {
  const collectionRef = collection(db, "products");
  const productsSnapshop = await getDocs(collectionRef);

  const docs = productsSnapshop.docs;
  const dataDocs = docs.map((doc) => {
    return {
      ...(doc.data() as Omit<Product, "id">),
      id: doc.id,
    };
  });
  return dataDocs;
};

//getProductById
export const getProductById = async (productId: string) => {
  const documentRef = doc(db, "products", productId);
  const docSnapshot = await getDoc(documentRef);
  const docData = docSnapshot.data();

  return {
    ...(docData as Omit<Product, "id">),
    id: docSnapshot.id,
  };
};

//getProductByCategory
export const getProductByCategory = async (
  category: string,
): Promise<Product[]> => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, where("category", "==", category));
  const productsSnapshot = await getDocs(q);

  const docs = productsSnapshot.docs;
  const dataDocs = docs.map((doc) => {
    return {
      ...(doc.data() as Omit<Product, "id">),
      id: doc.id,
    };
  });
  return dataDocs;
};

export const createBuyOrder = async (buyOrder: BuyOrder): Promise<string> => {
  const collectionRef = collection(db, "orders");
  const docRef = await addDoc(collectionRef, {
    ...buyOrder,
    createAt: serverTimestamp(),
  });
  return docRef.id;
};

export const exportProductsToFirestore = async () => {
  for (const product of products) {
    const collectionRef = collection(db, "products");
    await addDoc(collectionRef, product);
  }
};
