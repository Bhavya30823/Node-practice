const  userRepository = require("../repositories/userRepository");
function register(email, password){
    const existingUser = userRepository.findByEmail(email);  
    if (existingUser) {
      return { status: 400, message: "User already exists" };
    }
    userRepository.createUser(email, password);
    return { status: 200, message: "User registered successfully" }; 
}
function  login(email, password){
    const existingUser = userRepository.findByEmail(email);  
    if (!existingUser) {
      throw new Error("User not found");
    }
    if (existingUser.password !== password) {
      throw new Error("Invalid password");
    }
   return {
    token: "fake-jwt-token" + existingUser.email,
   };
}
module.exports = {
    register,
    login
};