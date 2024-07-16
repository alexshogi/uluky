import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserDataType, UserCredentialsType } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const userData = ref<UserDataType>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const userCredentials = ref<UserCredentialsType>({
    password: '',
    authToken: '',
  });

  function setUserData(data:UserDataType) {
    const { firstName, lastName, phone, email } = data;

    const phoneUnmasked = `+${phone.replace(/[^0-9]/g, '')}`;

    userData.value.firstName = firstName;
    userData.value.lastName = lastName;
    userData.value.phone = phoneUnmasked;
    userData.value.email = email;
  }

  function setUserPassword(password:string) {
    userCredentials.value.password = password;
  }

  async function generatePassword(length:number = 10) {
    const getRandomChar = () => {
      const charSets = [
        [48, 57],  // Numbers (0-9)
        [65, 90],  // Uppercase letters (A-Z)
        [97, 122], // Lowercase letters (a-z)
        [33, 47],  // Special characters (!"#$%&'()*+,-./)
        [91, 96],  // Special characters ([\]^_`)
      ];
        
      // Select a random character set
      const charSet = charSets[Math.floor(Math.random() * charSets.length)];
      // Generate a random character code from the selected set
      const charCode = Math.floor(Math.random() * 
      (charSet[1] - charSet[0] + 1)) + charSet[0];
      // Convert the character code to a character
      return String.fromCharCode(charCode);
    };

    let password = '';

    for (let i = 0; i < length; i++) {
      password += getRandomChar();
    }

    setUserPassword(password);
    
    return password;
  }

  function setUserToken(token:string) {
    userCredentials.value.authToken = token;
  }

  function generateToken() {
    const enc = new TextEncoder();

    window.crypto.subtle.importKey(
      // raw format of the key - should be Uint8Array
      'raw',
      enc.encode('mysecretkey'),
       // algorithm details
      {
        name: 'HMAC',
        hash: {name: 'SHA-512'},
      },
      // export = false
      false,
      // what this key can do
      ['sign', 'verify'],
    )
    .then(key => {
      window.crypto.subtle.sign(
      'HMAC',
      key,
      enc.encode("myawesomedata")
      )
      .then(signature => {
        const b = new Uint8Array(signature);
        const str = Array.prototype.map.call(b, x => x.toString(16).padStart(2, '0')).join('');

        setUserToken(str);
      });
    });
  }

  return {
    userData,
    userCredentials,
    setUserData,
    generatePassword,
    generateToken,
  }
});
