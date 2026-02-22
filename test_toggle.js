const axios = require('axios');
const jwtDecode = require('jwt-decode');

async function test() {
  try {
    const loginRes = await axios.post('http://localhost:8080/api/login', {
      email: 'yjamal710@gmail.com',
      password: 'UHU%?LUO*0kg'
    });
    const token = loginRes.data;
    console.log("Logged in");
    
    // Get services
    const getRes = await axios.get('http://localhost:8080/api/services/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Services:", getRes.data.map(s => ({ id: s.id, isActive: s.isActive })));
    
    if (getRes.data.length > 0) {
      const serviceId = getRes.data[0].id;
      console.log("Toggling service", serviceId);
      
      const toggleRes = await axios.patch(`http://localhost:8080/api/services/${serviceId}/toggle-status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Toggle SUCCESS:", toggleRes.data.isActive);
    } else {
        console.log("No services found to test");
    }
  } catch (err) {
    console.error("ERROR:", err.response ? err.response.data : err.message);
  }
}
test();
