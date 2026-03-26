// import { ref, onMounted } from "vue";

// export default function useDogImages() {
//   const dogs = ref([]);

//   onMounted(async () => {
//     const response = await fetch(
//       "https://dog.ceo/api/breed/labrador/images/random/6"
//     );
//     const { message } = await response.json();
//     dogs.value = message;
//   });

//   return { dogs };
// }



// export function useUserData(userId) {
//   const user = ref(null);
//   const error = ref(null);

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(`/api/users/${userId}`);
//       user.value = response.data;
//     } catch (e) {
//       error.value = e;
//     }
//   };

//   return { user, error, fetchUser };
// }
// // In component
// setup() {
//   const { user, error, fetchUser } = useUserData(userId);

//   watch(error, (newValue) => {
//     if (newValue) {
//       showToast("An error occurred.");  // UI logic in component
//     }
//   });

//   return { user, fetchUser };
// }