const  userRepository = require("../repositories/userRepository");
function register(email, password){
    const existingUser = userRepository.findByEmail(email);  
    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = userRepository.createUser(email, password);
    return user;
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