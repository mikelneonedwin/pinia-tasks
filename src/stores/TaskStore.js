import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
    }),
    getters: {
        favs(){
            return this.tasks.filter(t => t.isFav);
        },
        favCount(){
            return this.tasks.reduce((p,c) => {
                return c.isFav ? p + 1 : p;
            }, 0);
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks(){
            this.loading = true;
            const data = JSON.parse(localStorage.getItem("tasks") || "[]");
            this.tasks = data;
            this.loading = false;
        },
        async addTask(task){
            this.tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(this.tasks))
        },
        async deleteTask(id){
            this.tasks = this.tasks.filter(t => t.id !== id);
            localStorage.setItem("tasks", JSON.stringify(this.tasks))
        },
       async toggleFav(id){
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;
            localStorage.setItem("tasks", JSON.stringify(this.tasks))
        }
    }
})