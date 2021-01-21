import jsonwebtoken from "jsonwebtoken";

const generateWebToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export default generateWebToken;
