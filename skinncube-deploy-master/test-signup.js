const axios = require('axios');

async function testSignup() {
    try {
        const userData = {
            name: "Test User Email",
            email: "test.email@example.com",
            phno: "1234567890",
            password: "testpassword123"
        };

        console.log('Testing user registration...');
        const response = await axios.post('http://localhost:8000/api/v1/users/register', userData, {
            headers: { "Content-Type": "application/json" }
        });

        console.log('Registration successful!');
        console.log('Response:', response.data);

    } catch (error) {
        console.error('Registration failed!');
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status:', error.response.status);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testSignup();
