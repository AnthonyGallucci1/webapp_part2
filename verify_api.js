// const fetch = require('node-fetch'); // Native fetch in Node 18+ 

const BASE_URL = 'http://localhost:5000/api';

async function verify() {
    try {
        console.log('--- Starting Verification (Websites) ---');

        // 1. Register User
        console.log('\n1. Registering User...');
        const registerRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser_web',
                email: 'webtest@example.com',
                password: 'password123'
            })
        });
        const registerData = await registerRes.json();
        console.log('Register Response:', registerRes.status, registerData);

        let token = registerData.token;

        if (!token) {
            // If user already exists, try login
            console.log('User might already exist, logging in...');
            const loginRes = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'webtest@example.com',
                    password: 'password123'
                })
            });
            const loginData = await loginRes.json();
            console.log('Login Response:', loginRes.status, loginData);
            token = loginData.token;
        }

        if (!token) throw new Error('Failed to get token');

        // 2. Create Website
        console.log('\n2. Creating Website...');
        const createRes = await fetch(`${BASE_URL}/websites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                name: 'Vulnerable Site',
                url: 'http://vulnerable.com',
                riskLevel: 'High',
                isProtected: false
            })
        });
        const createData = await createRes.json();
        console.log('Create Website Response:', createRes.status, createData);
        const websiteId = createData._id;

        // 3. Get All Websites
        console.log('\n3. Getting All Websites...');
        const getAllRes = await fetch(`${BASE_URL}/websites`, {
            headers: { 'x-auth-token': token }
        });
        const getAllData = await getAllRes.json();
        console.log('Get All Websites Response:', getAllRes.status, `Count: ${getAllData.length}`);

        // 4. Update Website
        console.log('\n4. Updating Website...');
        const updateRes = await fetch(`${BASE_URL}/websites/${websiteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                isProtected: true,
                riskLevel: 'Low'
            })
        });
        const updateData = await updateRes.json();
        console.log('Update Website Response:', updateRes.status, updateData);

        // 5. Delete Website
        console.log('\n5. Deleting Website...');
        const deleteRes = await fetch(`${BASE_URL}/websites/${websiteId}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        });
        const deleteData = await deleteRes.json();
        console.log('Delete Website Response:', deleteRes.status, deleteData);

        console.log('\n--- Verification Complete ---');

    } catch (err) {
        console.error('Verification Failed:', err);
    }
}

verify();
