const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your admin password: ', (password) => {
  bcrypt.hash(password, 10).then(hash => {
    console.log('\nYour password hash:');
    console.log(hash);
    console.log('\nAdd this to your .env.local file as ADMIN_PASSWORD_HASH');
    rl.close();
  });
});

