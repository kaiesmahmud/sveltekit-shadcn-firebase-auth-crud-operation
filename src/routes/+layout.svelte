<script>
  import "../app.postcss";
  import "../app.css";
	import { authStore } from './../lib/store/store.js';
  import { auth, db } from './../lib/firebase/firebase.js';
  import { onMount } from "svelte";
  import { doc, getDoc, setDoc } from 'firebase/firestore';

  const nonAuthRoutes = [ '/']
  onMount(()=>{
    console.log("Mounting")
    const unsubscribe = auth.onAuthStateChanged( async (user)=>{
      const currentPath = window.location.pathname;
      
      if(!user && !nonAuthRoutes.includes(currentPath)){
        window.location.href = '/'
        return ;
      }
      if(user && currentPath === '/'){
        window.location.href = '/dashboard';
        return;
      }

      if(!user){return ;}
      let dataToSetToStore = {
            email:user.email,
            todos:[],
          }

      const docRef = doc(db, 'users',user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        const userRef = doc(db,'users',user.uid)
        await setDoc(userRef ,dataToSetToStore, {merge : true }
        )
      }else{
        const userData = docSnap.data();
        dataToSetToStore = userData;

        console.log("Userdata is - ",dataToSetToStore)
      }

      authStore.update((curr)=>{
        return {
          ...curr,
          user,
          data: dataToSetToStore,
          loading:false
        }
      })

    })
  })
</script>
<div class="text-white bg-slate-800/70 min-h-screen">
  <slot />
</div>
