<script lang="ts">
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { Label } from "$lib/components/ui/label";


let email = "";
let password = "";
let confirmpass = "";
let register = false ;
let inputStyles = "w-[100%] p-5 rounded bg-white/50 focus-within:border-none"
const changeRegister = () => {
    register = !register
}
</script>

<div class="w-[90%] md:w-[70%] lg:w-[50%] bg-white/10 rounded p-5 flex flex-col items-center justify-center gap-10 pb-20 pt-10">
    {#if register}
        <h1 class=" text-cyan-500">Register Now</h1>
    {:else}
        <h1 class=" text-green-500">Login</h1>
    {/if}
    
    <form  class="flex flex-col items-center justify-center gap-3 w-2/3">
        <Label for="email" class="w-[100%]  font-bold" >Email:</Label>
        <Input bind:value={email} class={inputStyles}  type="email" name="email" id="email" required />
        <Label for="password" class="w-[100%] font-bold ">Password:</Label>
        <Input bind:value={password} class={inputStyles}  type="password" name="password" id="password" required />
        {#if register}
            <Label for="checkpassword" class="w-[100%] font-bold ">Confirm Password:</Label>
            <Input bind:value={confirmpass} class={inputStyles}  type="password" name="checkpassword" id="checkpassword" required />            
            <Button type="submit" class="w-full mt-5">Register</Button>
        {:else}
            <Button type="submit" class="w-full mt-5">login</Button>
        {/if}
        
        
    </form>
    <div class="flex items-center justify-center gap-5 w-full text-lg md:text-xl capitalize font-bold"><hr class="w-[45%]"/>or <hr class="w-[45%]"/></div>
    {#if register}
        <p on:click={changeRegister} on:keypress={()=>{}} class="text-xl font-bold cursor-pointer hover:text-white/80 hover:underline" >Already Have An Account : <span class="text-cyan-500 hover:text-cyan-600">Login</span></p>
    {:else}
        <p on:click={changeRegister} on:keypress={()=>{}} class="text-xl font-bold cursor-pointer hover:text-white/80 hover:underline" >Create An Account : <span class="text-green-500 hover:text-green-600">Register</span></p>
    {/if}
</div>