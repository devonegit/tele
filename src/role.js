
const roles = {
    876275455:"Buyer",
    592599936:"Owner"
    
}

const getUserRole = (userId) => {

    const role = roles[userId];
 
    return role || "Not Found";
  };
  
  module.exports = getUserRole;