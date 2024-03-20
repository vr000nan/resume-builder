import { arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { toast } from "react-toastify";

export const getUserDetail = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if(userCred){
                const userData = userCred.providerData[0];

                const unsubscribe = onSnapshot(doc(db, "users", userData?.uid), (_doc) => {
                    if(_doc.exists()){
                        resolve(_doc.data())
                    }else{
                        setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                            resolve(userData);
                        });
                    }
                });

                return unsubscribe;
            }else{
                reject(new Error("User is not authenticated"));
            };

            // make sure to unsubscribe from the listener to prevent memory leaks
            unsubscribe();
        });
    })
};

export const getTemplates = () => {
    return new Promise((resolve, reject) => {
        const templateQuery = query(
            collection (db, "templates"),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
            const templates = querySnap.docs.map((doc) => doc.data());
            resolve(templates);
        })

        return unsubscribe;
    })
};

export const saveToCollections = async (user, data) => {
    if(!user?.collections?.includes(data?._id)){
        const docRef = doc(db, "users", user?.uid)

        await updateDoc(docRef, {
            collections: arrayUnion(data?._id)
        }).then(() => {
            toast.success("Saved to Collections")
        }).catch((err) => {
            toast.error(`Error: ${err.message}`)
        });
    } else{
        const docRef = doc(db, "users", user?.uid)

        await updateDoc(docRef, {
            collections: arrayRemove(data?._id)
        }).then(() => {
            toast.success("Removed from Collections")
        }).catch((err) => {
            toast.error(`Error: ${err.message}`)
        });
    }
};