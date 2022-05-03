<script>
	import {auth, googleProvider} from "./firebase";
	import {authState} from "rxfire/auth";

	let user;

	const unsubscribe = authState(auth).subscribe(usr => user = usr);

	function login(){
		auth.signInWithPopup(googleProvider);
	}

	function logout() {
		auth.signout();
	}
</script>


<style>
	
</style>

<main>
	{#if user}
		Logged in as {user.uid}
	{:else}
		<button on:click={login}>
			<i class="fa fa-google"></i>
			Sign In with Google
		</button>
	{/if}
</main>
