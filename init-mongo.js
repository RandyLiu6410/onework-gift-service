db.createUser({
  user: process.env.MONGODB_ACCESS_KEY,
  pwd: process.env.MONGODB_SECRET_KEY,
  roles: [
    {
      role: "readWrite",
      db: "one-work-fs-external",
    },
  ],
});
