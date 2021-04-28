const { admin } = require('../db/admin');
const db = admin.firestore();
const collections = { sandbox: 'user_sandboxes' };
const api404Error = require('../error/api404Error');

const getCollectionDocs = async (collection) => {
  try {
    const booksRef = db.collection(collection);

    booksRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(`All docs in ${collection} collection`, data);
      return data;
    });
  } catch (error) {
    console.error(error);
  }
};

const del = async (docId) => {
  try {
    const booksRef = db.collection(collections.sandbox);
    await booksRef.doc(docId).delete();
  } catch (error) {
    console.error(error);
  }
};

const getActiveSandbox = async (userId) => {
  try {
    const userSandboxeInfoRef = db.collection(collections.sandbox).doc(userId);
    const userSandboxeInfo = await userSandboxeInfoRef.get();
    if (!userSandboxeInfo.exists)
      throw new api404Error(`usersId: ${userId} sandbox info not found`);
    return userSandboxeInfo.data().active;
  } catch (error) {
    throw error;
  }
};

const registerSandbox = async (userId, sandboxId) => {
  try {
    const userSandboxeInfoRef = db.collection(collections.sandbox).doc(userId);
    const registerRes = await userSandboxeInfoRef.set(
      { active: sandboxId },
      { merge: true }
    );

    const updateHistoryRes = await userSandboxeInfoRef.update({
      history: admin.firestore.FieldValue.arrayUnion(sandboxId)
    });

    await getCollectionDocs(collections.sandbox);
    return { ...registerRes, ...updateHistoryRes };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerSandbox,
  getActiveSandbox,
  del
};
