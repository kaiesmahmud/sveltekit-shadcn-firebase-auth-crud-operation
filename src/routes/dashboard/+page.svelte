<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import Icon from '@iconify/svelte';

    import { authHandler, authStore } from "../../lib/store/store";
    import { doc, setDoc } from 'firebase/firestore';
    import { db } from '../../lib/firebase/firebase';

    const btnStyle = "flex items-center justify-center gap-5"

    let todoList = [
        "This is list 1",
    ]
    let currentToDo = "";
    console.log(authStore)
    authStore.subscribe((curr) => {
        todoList = curr.data.todos;
    });
    const handleLogout = async ()=>{
        await authHandler.logout();
    }
    const handleNewTodo = ()=>{
        console.log(currentToDo);
        if(currentToDo.length > 2 ){
            todoList = [...todoList, currentToDo];
            currentToDo = "";
        }
    }
    const editTodo = (index)=>{
        console.log("Edit-Todo Clicked ",todoList[index])
        let newTodolist = todoList.filter((val,i)=> i !== index); // Removing the item from the list
        currentToDo = todoList[index] ; // Give the item to the input field -- if click on add btn then item will be added as new item
        todoList = newTodolist ; // Save the list without the item 
    }
    const removeTodo = (index)=>{
        console.log("Remove-Todo Clicked ",index)
        let newTodolist = todoList.filter((val,i)=> i !== index); // Removing the item from the list
        todoList = newTodolist ; // Save the list without the item 
    }

    const saveTodos = async ()=>{
        console.log("Saving todos")
        try {
            const userRef = doc(db,"users",$authStore.user.uid);
            await setDoc(userRef,{
                todos: todoList
            }, {merge: true})
        } catch (error) {
            console.log("Error on saving todos, ", error)
        }
    }
</script>
{#if !$authStore.loading}
    <div class="flex items-center justify-between px-5 py-10">
        <h1>ToDo List</h1>
        <div class="flex gap-10">
            <Button on:click={saveTodos} variant={'secondary'} class={btnStyle}>
                <p class="text-2xl">
                    <Icon icon="material-symbols:save-outline" />
                </p> 
                <p>Save</p>
            </Button>
            <Button on:click={handleLogout} variant={'destructive'} class={btnStyle}>
                <p class="text-2xl">
                    <Icon icon="uiw:logout" /> 
                </p>
                <p>Logout</p>
            </Button>
        </div>
    </div>
    <p class="texts-2xl font-semibold px-10 text-green-500">Add ToDo:</p>
    <div class="flex w-2/3 gap-5 px-10">
        
        <Input bind:value={currentToDo} type="text" name="todo" id="todo" class="text-white bg-white/10 "/>
        <Button on:click={handleNewTodo} class={btnStyle}>
            <p class="text-2xl">
                <Icon icon="carbon:add-filled" />
            </p>
            <p>Add</p>
        </Button>
    </div>
    <div class="p-5 md:p-10">
        {#if todoList.length < 1}
        <div class="border-b border-cyan-500 p-3 md:p-5 text-xl md:text-2xl my-2 flex items-center justify-between">
            You Have Nothing Here ! Create one 
        </div>
        {/if}
        {#each todoList as todo,index}
            <div class="border-b border-cyan-500 p-3 md:p-5 text-xl md:text-2xl my-2 flex items-center justify-between">
                <p>{index+1}. {todo}</p>
                <div class="flex items-center justify-center gap-5 ">
                    <button on:click={()=>{editTodo(index)}} class="text-4xl hover:text-teal-500 rounded-full p-3 bg-slate-600 cursor-pointer  transition-all ease-in">
                        <Icon icon="mdi:application-edit" />
                    </button>
                    <button  on:click={()=>{removeTodo(index)}} class="text-4xl hover:text-red-500 p-3 rounded-full bg-red-100 text-red-900 cursor-pointer hover:bg-red-200 transition-all ease-in">
                        <Icon icon="material-symbols:delete" />
                    </button>
                </div>
            </div>
        {/each}
    </div>
{/if}