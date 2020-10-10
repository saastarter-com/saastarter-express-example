import admin from "firebase-admin";

const getAuthToken = (
    req,
    res,
    next
  ) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      req.authToken = req.headers.authorization.split(" ")[1];
    }
    next();
  };
  
  export const authenticationRequired = (
    req,
    res,
    next
  ) => {
    getAuthToken(req, res, async () => {
      try {
        const { authToken } = req;
        const userInfo = await admin.auth().verifyIdToken(authToken);
        req.user = userInfo;
  
        return next();
      } catch (e) {
          console.error('error auth', e);
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request." });
      }
    });
  };