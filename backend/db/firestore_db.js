const { admin } = require('../db/admin');
const db = admin.firestore();
const collections = { sandbox: 'user_sandboxes' };
const api404Error = require('../error/api404Error');

const getCollectionDocs = async (collection) => {
  try {
    const docsRef = db.collection(collection);

    return docsRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      return data;
    });
  } catch (error) {
    throw error;
  }
};

const del = async (docId) => {
  try {
    const docsRef = db.collection(collections.sandbox);
    await docsRef.doc(docId).delete();
  } catch (error) {
    throw error;
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

    return { ...registerRes, ...updateHistoryRes };
  } catch (error) {
    throw error;
  }
};

const getSandboxInfo = (sandboxId) => {
  const userSandboxeInfo = db
    .collection(collections.sandbox)
    .where('active', '==', sandboxId)
    .get();
  if (!userSandboxeInfo.exists)
    return api404Error(`no user have active sandbox with arn:${sandboxId}`);
  return userSandboxeInfoRef.data();
};

module.exports = {
  getSandboxInfo,
  registerSandbox,
  getActiveSandbox,
  del,
  getCollectionDocs
};
