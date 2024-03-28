<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Users
                    <RouterLink to="/users/create" class="btn btn-primary float-end">
                        Add User
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.users.length > 0">
                        <tr v-for="(users, index) in this.users" :key="index">
                            <td>{{ users.id }}</td>
                            <td>{{ users.name }}</td>
                            <td>{{ users.surname }}</td>
                            <td>{{ users.email }}</td>
                            <td>{{ users.phone }}</td>
                            <td>{{ users.created_at }}</td>
                            <td>
                                <RouterLink :to="{ path: '/users/edit/' + users.id }" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button type="button" @click="deleteUsers(users.id)" class="btn btn-danger float-end">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colpsan="7">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>
  
  
<script>
import axios from 'axios'

export default {
    name: 'users',
    data() {
        return {
            users: []
        }
    },
    mounted() {

        this.getUsers();
        //console.log('i am here')
    },
    methods: {
        getUsers() {

            axios.get('http://localhost:8000/api/users').then(res => {
                this.users = res.data.users
                //console.log(this.users)
            });
        },

        deleteUsers(userId) {
            if (confirm('Are you sure you want to delete this user?')) {
                //console.log(usersId)
                axios.delete(`http://localhost:8000/api/users/delete/${userId}`).then(res => {

                    alert(res.data.message);
                    this.getUsers();

                })
                    .catch(function (error) {

                        if (error.response) {

                            if (error.response.status == 404) {

                                alert(error.response.data.message);
                            }
                        }
                    });
            }
        },
    },
}


</script>