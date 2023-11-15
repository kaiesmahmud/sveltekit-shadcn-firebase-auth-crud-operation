<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import Icon from '@iconify/svelte';

    let todoList = [
        "This is list 1",
    ]
    let currentToDo = "";
    const handleNewTodo = ()=>{
        console.log(currentToDo);
        if(currentToDo.length > 2 ){
            todoList = [...todoList, currentToDo];
            currentToDo = "";
        }
    }
</script>

<div class="flex items-center justify-between px-5 py-10">
    <h1>ToDo List</h1>
    <div class="flex gap-10">
        <Button variant={'secondary'}>Save</Button>
        <Button variant={'destructive'}>Logout</Button>
    </div>
</div>
<p class="texts-2xl font-semibold px-10 text-green-500">Add ToDo:</p>
<div class="flex w-2/3 gap-5 px-10">
    
    <Input bind:value={currentToDo} type="text" name="todo" id="todo" class="text-white bg-white/10 "/>
    <Button on:click={handleNewTodo} >Add</Button>
</div>
<div class="p-5 md:p-10">
    {#each todoList as todo,index}
        <div class="border-b border-cyan-500 p-3 md:p-5 text-xl md:text-2xl my-2 flex items-center justify-between">
            <p>{index+1}. {todo}</p>
            <div class="flex items-center justify-center gap-5 ">
                <div class="text-4xl hover:text-teal-500 rounded-full p-3 bg-slate-600 cursor-pointer  transition-all ease-in">
                    <Icon icon="mdi:application-edit" />
                </div>
                <div class="text-4xl hover:text-red-500 p-3 rounded-full bg-red-100 text-red-900 cursor-pointer hover:bg-red-200 transition-all ease-in">
                    <Icon icon="material-symbols:delete" />
                </div>
            </div>
        </div>
    {/each}
</div>